import { useContext, useEffect, useRef } from "react";
import { LeafletMap, TileLayer, Marker, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import IpContext from "../context/IpContext";
import type ipAPI from "../types/types";
import locationIcon from "../images/icon-location.svg";

// The black pin from the design. The bottom tip of the pin sits on the location.
const pinIcon = new Icon({
  iconUrl: locationIcon,
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

export default function MapView() {
  const data: ipAPI | null = useContext(IpContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);

  // Create the map once when the component first shows up.
  useEffect(() => {
    if (!containerRef.current) return;

    const map = new LeafletMap(containerRef.current, {
      center: [0, 0],
      zoom: 2,
      zoomControl: false,
    });

    new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    // Remove the map when the component goes away (StrictMode runs this twice in dev).
    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // Move the map and the pin every time new IP data comes in.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !data) return;

    const position: [number, number] = [data.location.lat, data.location.lng];

    map.setView(position, 13);

    if (markerRef.current) {
      markerRef.current.setLatLng(position);
    } else {
      markerRef.current = new Marker(position, { icon: pinIcon }).addTo(map);
    }
  }, [data]);

  return <div ref={containerRef} className="h-full w-full" />;
}
