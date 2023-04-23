import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';

import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"

import StatusLockedPage from "@/components/statusLockedPage";

export default function Orders({user}: {user:User}) {

    type Package = {
        id: number;
        delivered: boolean;
        deliveryDate: string;
        address: string;
        order: {
          price: number;
        };
      };

    const [packages, setPackages] = useState<Package[]>([]);

    return(
        <StatusLockedPage user={user} status="CLIENT" f={async() => {
            useEffect(() => {
                const fetchData= async () => {
                    try {
                        const response = await axios.post('/api/tracking', { id: user.id });
                        setPackages(response.data);
                        console.log(response.data)
                    } catch (error) {
                        console.error(error);
                    }
                }
                fetchData();
            }, [user.id]);
            
        }}>
            <Layout pageName="Mes commandes" user={user}>
                <div>
                    <h1>Suivez ici la livraison de vos commandes</h1>

                    {packages.sort((a, b) => a.id - b.id).map((pkg) => (
                        <div key={pkg.id} className="flex">
                            <h2 className="mr-5">Commande n°{pkg.id}</h2>
                            <div>
                                <p>Livré: {pkg.delivered ? 'Oui' : 'Non'}</p>
                                <p>Date de livraison estimée: {format(new Date(pkg.deliveryDate), 'dd/MM/yyyy')}</p>
                                <p>Adresse de livraison: {pkg.address}</p>
                                <p>Prix total: {pkg.order.price}€ </p>
                            </div>
                        </div>
                    ))}
                </div>

            </Layout>
        </StatusLockedPage>
    )
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      const user = req.session.user;
  
      return {
        props: {
          user: user || null,
        },
      };
    }, sessionOptions
  );