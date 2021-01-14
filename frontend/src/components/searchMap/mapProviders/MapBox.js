import { useState, useEffect } from "react";

import PT from "prop-types";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { GiPositionMarker } from "react-icons/gi";

import styled from "styled-components";

const iconWidth = "30px";
const iconHeight = "30px";

const StyledMarker = styled.button`
  & {
    border: none;
    background: none;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }

  svg {
    width: ${iconWidth};
    height: ${iconHeight};
    /* Make sure the tip of the icon is centered on the spot */
    transform: translate(-50%, -100%);
  }
`;

const StyledPopup = styled(Popup)`
  transform: translate(0px, ${iconHeight});
`;

function Map({
  markers,
  selectedMarker = null,
  onMarkerSelected,
  PopUpContent,
}) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 41.3825,
    longitude: 2.1769,
    zoom: 8,
  });

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedMarker(null);
      }
    };
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-undef
      window.addEventListener("keydown", listener);
    }

    return () => {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-undef
        window.removeEventListener("keydown", listener);
      }
    };
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      mapStyle="mapbox://styles/getmeout/ckjx70dwn1iga17pjw2pqwpyq"
      onClick={() => onMarkerSelected(null)}
    >
      {markers.map((mark) => (
        <Marker
          key={mark.city}
          longitude={Number(mark.lng)}
          latitude={Number(mark.lat)}
        >
          <StyledMarker
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onMarkerSelected(mark);
            }}
          >
            <GiPositionMarker />
          </StyledMarker>
        </Marker>
      ))}

      {selectedMarker && (
        <StyledPopup
          longitude={Number(selectedMarker.lng)}
          latitude={Number(selectedMarker.lat)}
          closeButton
          closeOnClick
          onClose={() => onMarkerSelected(null)}
        >
          <PopUpContent {...selectedMarker} />
        </StyledPopup>
      )}
    </ReactMapGL>
  );
}

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
