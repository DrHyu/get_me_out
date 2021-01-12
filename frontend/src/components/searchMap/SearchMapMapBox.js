import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { GiPositionMarker } from "react-icons/gi";

import styled from "styled-components";

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

function SearchMap({ markers }) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 41.3825,
    longitude: 2.1769,
    zoom: 8,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

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
              setSelectedMarker(mark);
            }}
          >
            <GiPositionMarker style={{ width: "30px", height: "30px" }} />
          </StyledMarker>
        </Marker>
      ))}

      {selectedMarker && (
        <Popup
          longitude={Number(selectedMarker.lng)}
          latitude={Number(selectedMarker.lat)}
        >
          <div>{`Name: ${selectedMarker.city}`}</div>
          <div>{`Name: ${selectedMarker.iso2}`}</div>
          <div>{`Name: ${selectedMarker.population}`}</div>
          <div>{selectedMarker.iso2}</div>
          <div>{selectedMarker.population}</div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default SearchMap;
