import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';
import L from 'leaflet';

// حل مشكلة أيقونات الماركر
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// إحداثيات مكة المكرمة (بشكل تقريبي)
const makkahCoordinates: L.LatLngExpression = [21.4225, 39.8262];

// مكون مخصص لرسم الخريطة الحرارية الوهمية
const PseudoHeatmap = () => {
  const map = useMap();

  useEffect(() => {
    // رسم دوائر وهمية لتمثيل الخريطة الحرارية
    L.circle([21.40, 39.78], { // إحداثيات جديدة
      color: '#d97d78ff',
      fillColor: '#ff6961',
      fillOpacity: 0.5,
      radius: 2500 
    }).addTo(map);

    L.circle([21.48, 39.88], { // إحداثيات جديدة
      color: '#a0d468',
      fillColor: '#a0d468',
      fillOpacity: 0.5,
      radius: 4000 
    }).addTo(map);

    L.circle([21.45, 39.84], { // إحداثيات جديدة
      color: '#ffda79',
      fillColor: '#ffda79',
      fillOpacity: 0.5,
      radius: 1000
    }).addTo(map);
  }, [map]);
  return null;
};
// مكون مخصص للتعامل مع أحداث النقر على الخريطة
interface MapClickHandlerProps {
  setMarkerPosition: React.Dispatch<React.SetStateAction<L.LatLng | null>>;
  setPopupData: React.Dispatch<React.SetStateAction<string>>;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ setMarkerPosition, setPopupData }) => {
  useMapEvents({
    click(e) {
      setMarkerPosition(e.latlng);
      // هنا يمكنك توليد بيانات وهمية عشوائية
      const randomProbability = (Math.random() * 50 + 50).toFixed(0);
      setPopupData(`احتمالية نجاح الزراعة: ${randomProbability}%`);
    },
  });
  return null;
};

const MapComponent: React.FC = () => {
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const [popupData, setPopupData] = useState<string>('');

  return (
    <div className={styles.mapContainer}>
      <MapContainer 
        center={makkahCoordinates} 
        zoom={13} 
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <PseudoHeatmap />
        <MapClickHandler setMarkerPosition={setMarkerPosition} setPopupData={setPopupData} />

        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>
              {popupData}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
