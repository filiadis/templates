import { useEffect, useRef } from "react";
import styles from "./MapRef.module.css";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultInteractions } from "ol/interaction";

export default function MapRef() {
  // 1️⃣ div reference
  const mapRef = useRef<HTMLDivElement | null>(null);

  // 2️⃣ OpenLayers Map reference
  const mapInstance = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new Map({
      target: mapRef.current, // ✅ now safe
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [2451664, 4636968],
        zoom: 7,
        projection: "EPSG:3857",
        maxZoom: 18,
      }),
      controls: [],
      interactions: defaultInteractions({
        // Use default interactions
        pinchZoom: true, // Disable pinch zoom
        mouseWheelZoom: true, // Disable mouse wheel zoom
      }),
    });
  }, []);

  return <div ref={mapRef} className={styles.map}></div>;
}
