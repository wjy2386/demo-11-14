import React, { useEffect, useRef } from 'react';
import { Activity } from '../types';

declare const L: any;

interface InteractiveMapProps {
  activities: Activity[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ activities }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
        const validActivities = activities.filter(a => a.coordinates && typeof a.coordinates.lat === 'number' && typeof a.coordinates.lng === 'number');

        if (validActivities.length === 0) {
            return;
        }

        const firstCoord = validActivities[0].coordinates;
        mapRef.current = L.map(mapContainerRef.current).setView([firstCoord.lat, firstCoord.lng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);
    }
    
    const map = mapRef.current;
    if (!map) return;

    map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });

    const validActivities = activities.filter(a => a.coordinates && typeof a.coordinates.lat === 'number' && typeof a.coordinates.lng === 'number');

    if (validActivities.length > 0) {
        const markers: any[] = [];
        validActivities.forEach((activity, index) => {
            const marker = L.marker([activity.coordinates.lat, activity.coordinates.lng])
                .addTo(map)
                .bindPopup(`<b>${index + 1}. ${activity.name}</b><br>${activity.location}`);
            markers.push(marker);
        });

        if (validActivities.length > 1) {
            const latLngs = validActivities.map(a => [a.coordinates.lat, a.coordinates.lng]);
            const polyline = L.polyline(latLngs, { color: '#06b6d4', weight: 4 }).addTo(map);
            map.fitBounds(polyline.getBounds().pad(0.1));
        } else {
             map.setView([validActivities[0].coordinates.lat, validActivities[0].coordinates.lng], 14);
        }
    }

  }, [activities]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const validActivities = activities.filter(a => a.coordinates && typeof a.coordinates.lat === 'number' && typeof a.coordinates.lng === 'number');

  if (validActivities.length === 0) {
      return (
        <div className="w-full h-full rounded-lg shadow-inner bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-center p-4" style={{ minHeight: '400px' }}>
            <p className="text-slate-500 dark:text-slate-400">当地活动没有可在地图上显示的位置。</p>
        </div>
      );
  }

  return (
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-lg shadow-inner" 
        style={{ minHeight: '400px' }}
        aria-label="Map showing day's activities"
      />
  );
};

export default InteractiveMap;
