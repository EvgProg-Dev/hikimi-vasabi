import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

import iconMap from './../../assets/map-marker-svgrepo-com.svg'

const Map: React.FC = () => {
    const position: LatLngExpression = [49.1410026, 33.438752];
    const zoomLevel: number = 20;

    const customIcon = new L.Icon({
        iconUrl: iconMap, // Заменить на путь к своей иконке
        iconSize: [32, 32], // Размер иконки
        iconAnchor: [16, 32], // Якорь иконки
        popupAnchor: [0, -32], // Расположение всплывающего окна
      });

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
            <Marker position={position} icon={customIcon}>
                <Popup>Hikimi Vasabi</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
