import { useState, useRef, useEffect } from "react";
import PT from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "react-leaflet-markercluster/dist/styles.min.css";

const Map = ({ markers, onMarkerSelected, PopUpContent }) => {
  const [viewport] = useState({
    center: [41.3825, 2.1769],
    zoom: 8,
  });

  return (
    <MapContainer
      {...viewport}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
              <PopUpContent {...mark} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

Map.propTypes = {
  markers: PT.arrayOf(PT.shape({ lat: PT.number, lng: PT.number })),
  selectedMarker: PT.shape({ lat: PT.number, lng: PT.number }),
  onMarkerSelected: PT.func,
  PopUpContent: PT.node.isRequired,
};

Map.defaultProps = {
  markers: [],
  selectedMarker: null,
  onMarkerSelected: () => {},
};

export default Map;
