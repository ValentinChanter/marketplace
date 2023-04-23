import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
import twoOpt from "@/lib/tsp";

const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'openstreetmap',
};
const geocoder = NodeGeocoder(options);

import { getDistance } from 'geolib';

// Trouve tous les packages attribués à un livreur pour un jour donné et les renvoie après tri (avec 2-opt heuristique externe)
// L'algorithme de Dijkstra avait inialement été utilisé mais abandonné pour son inefficacité pour résoudre notre problème en particulier (voir ci-dessous pour + d'explications)
export default async function delivery(req: NextApiRequest, res: NextApiResponse) {
    const { id, date } = req.body;

    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 59);

    const packages = await prisma.package.findMany({
        where: {
            deliveryDate: {
                gte: startDate,
                lte: endDate
            },
            deliveryManId: id,
        },
        include: {
            order: {
                include: {
                    buyer: true
                }
            }
        }
    });

    if (!packages[0]) res.status(200).json({packages: []});
    else {
        const asyncNodes = packages.filter(pack => !pack.delivered).map(async pack => {
            const geocoderInfos = (await geocoder.geocode(pack.address))[0];

            if (geocoderInfos) {
                const { latitude, longitude } = geocoderInfos;

                return {
                    infos: {
                        id: pack.id,
                        firstName: pack.order.buyer.firstName,
                        lastName: pack.order.buyer.lastName,
                        address: pack.address,
                        isDelivered: pack.delivered,
                        latitude,
                        longitude
                    },
                    //nodeId: index + 1,
                    //visited: false,
                    //distanceTo: Infinity,
                    //from: -1
                }
            } else return null; // Si l'adresse n'existe pas, on renvoie null
        });

        const nodes = (await Promise.all(asyncNodes)).filter(x => x); // Et on l'enlève ensuite
        if (!nodes[0]) res.status(200).json({packages: []});
        else {
            // On fait commencer le livreur du dépôt (fixé à CY Tech ici)
            const CYAddress = "Avenue du Parc, 95000 Cergy"
            const geocoderInfos = (await geocoder.geocode(CYAddress))[0];
            const { latitude, longitude } = geocoderInfos;

            nodes.unshift({
                infos: {
                    id: 0,
                    firstName: "Dépôt",
                    lastName: "CYTech",
                    address: CYAddress,
                    isDelivered: false,
                    latitude,
                    longitude
                },
                //nodeId: 0,
                //visited: false,
                //distanceTo: 0,
                //from: -1
            });

            // Génération de la matrice des distances
            const graph = [] as number[][];
            for (let i = 0; i < nodes.length; i++) {
                graph.push(new Array(nodes.length).fill(0));
            }

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i; j < nodes.length; j++) {
                    const dist = getDistance({ lat: nodes[i].infos.latitude, lon: nodes[i].infos.longitude }, { lat: nodes[j].infos.latitude, lon: nodes[j].infos.longitude });
                    graph[i][j] = dist;
                    if (i !== j) graph[j][i] = dist;
                }
            }

            // Algorithme de Dijkstra
            // L'algo est ici inutile car toutes les villes sont reliées entre elles donc le chemin le plus court depuis le dépôt sera toujours celui partant du dépôt (inégalité triangulaire)
            // De ce fait, si on cherche le chemin en utilisant l'algo de Dijkstra, on se retrouvera à simplement parcourir toutes les villes dans l'ordre croissant de leur distance au dépôt
            /*
            const path = [];

            // Depuis le dépôt (initialisation)
            for (let i = 1; i < nodes.length; i++) {
                const dist = graph[0][i];
                const node = nodes[i];

                if (dist !== 0) {
                    node.distanceTo = dist;
                    node.from = 0
                }

                nodes[0].visited = true;
            }

            // Depuis chaque point de livraison
            for (let i = 1; i < nodes.length; i++) {
                // Prochain node non visité avec la distanceTo la plus faible
                const nextNode = nodes.filter(node => !node.visited).reduce((prevNode, currNode) => prevNode.distanceTo < currNode.distanceTo ? prevNode : currNode);

                for (let j = i; j < nodes.length; j++) {
                    if (nodes[j].visited) continue;
                    const dist = graph[nextNode.nodeId][j];
                    const node = nodes[j];

                    if (dist !== 0 && nextNode.distanceTo + dist < node.distanceTo) {
                        node.distanceTo = nextNode.distanceTo + dist;
                        node.from = nextNode.nodeId
                    }
                }

                nodes[nextNode.nodeId].visited = true;
                path.push(nextNode.infos);
            }
            */

            // On va utiliser une libraire pour résoudre un problème du voyageur de commerce avec 2-opt heuristique
            const indexes = twoOpt(graph, {startingPoint: 0, returnToStart: true});

            res.status(200).json({packages: indexes.map(i => nodes[i].infos)});
        }
    }
}