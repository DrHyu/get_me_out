import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "react-leaflet-markercluster/dist/styles.min.css";

const StyledMarker = styled.button`
  & {
    border: none;
    background: none;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const SearchMap = ({ markers, onMarkerSelected = null }) => {
  const [viewport] = useState({
    center: [41.3825, 2.1769],
    zoom: 8,
  });

  return (
    <MapContainer {...viewport} scrollWheelZoom>
      <TileLayer
        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        subdomains={["a", "b", "c"]}
      />
      <MarkerClusterGroup showCoverageOnHover={false}>
        {markers.map((mark) => (
          <Marker
            key={mark.city}
            position={[Number(mark.lat), Number(mark.lng)]}
            eventHandlers={{
              click: () => {
                onMarkerSelected(mark);
              },
            }}
          >
            <Popup position={[Number(mark.lat), Number(mark.lng)]}>
              <div>{`Name: ${mark.city}`}</div>
              <div>{`Name: ${mark.iso2}`}</div>
              <div>{`Name: ${mark.population}`}</div>
              <div>{mark.iso2}</div>
              <div>{mark.population}</div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
export default SearchMap;
