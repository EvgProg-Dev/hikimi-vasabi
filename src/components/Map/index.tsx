import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

const Map: React.FC = () => {
    const position: LatLngExpression = [49.1410026, 33.438752];
    const zoomLevel: number = 20;

    return (
        <MapContainer
            center={position}
            zoom={zoomLevel}
            className="leaflet-container"
            whenReady={() => {}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={new L.Icon.Default()}>
                <Popup>Hikimi Vasabi</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
