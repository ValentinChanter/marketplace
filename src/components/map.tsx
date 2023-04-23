import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import L from "leaflet";
import "leaflet-routing-machine";
import { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import 'leaflet-defaulticon-compatibility';

export function ChangeView({ coords }: { coords: LatLngExpression }) {
    const map = useMap();
    map.setView(coords, 12);
    return null;
}

export function Routing({addresses}: {addresses: any}) {
    const map = useMap();
  
    useEffect(() => {
        if (!map) return;

        const waypoints = addresses.map((address:any) => L.latLng(address.lat, address.lng));
        waypoints.push(waypoints[0]);

        const routingControl = L.Routing.control({
            waypoints,
            fitSelectedRoutes: true,
            draggableWaypoints: false,
            routeWhileDragging: false,
            createMarker: function() { return null; },
            lineOptions: {
                addWaypoints: false,
                styles: [{ color: '#ff0000', weight: 2 }],
                extendToWaypoints: false,
                missingRouteTolerance: 0
            }
        }).addTo(map);
  
      return () => map.removeControl(routingControl);
    }, [map]);
  
    return null;
}

const Map = ({addresses}: {addresses: any}) => {
    const geoData = { lat: 49.0338636, lng: 2.0720143 };

    const center = [geoData.lat, geoData.lng] as LatLngExpression;

    return (
        <MapContainer zoom={3} style={{ height: '80vh' }}>
            <TileLayer
                attribution='Google Maps'
                url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' subdomains={['mt0','mt1','mt2','mt3']}
            />

            {addresses ? addresses.map((a:any) => {
                return <Marker position={[a.lat, a.lng]} key={String(a.lat) + String(a.lng)} draggable={false} />
            }) : (
                <Marker position={center} />
            )}

            {addresses ? (
                <Routing addresses={addresses}/>
            ) : (
                <></>
            )}
        </MapContainer>
    )
};

export default Map;