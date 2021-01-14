import { map } from "lodash";
import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
import styled from "styled-components";
import Map from "./mapProviders/MapBox";

// const Map = dynamic(() => import("./mapProviders/MapBox"), {
//   ssr: false,
// });

const MapSearchStyled = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  z-index: 0;
`;

const RoomList = styled.div`
  position: absolute;

  top: 16px;
  bottom: 16px;
  left: 16px;

  overflow: scroll;
  z-index: 1000;

  width: 30%;

  background-color: white;

  border-radius: 16px;

  padding: 16px;
`;

const MapStyled = styled.div`
  width: 100%;
  height: 100%;
`;

function SearchMap({ roomScapeList }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <MapSearchStyled>
      <RoomList>
        {roomScapeList.map((room) => (
          <div key={room.city} onClick={() => setSelectedRoom(room)}>
            {room.city}
          </div>
        ))}
      </RoomList>
      <MapStyled>
        <Map
          markers={roomScapeList}
          selectedMarker={selectedRoom}
          onMarkerSelected={(room) => {
            setSelectedRoom(room);
          }}
          PopUpContent={({ city, iso2, population }) => (
            <div>
              <div>{`Name: ${city}`}</div>
              <div>{`Name: ${iso2}`}</div>
              <div>{`Name: ${population}`}</div>
              <div>{iso2}</div>
              <div>{population}</div>
            </div>
          )}
        />
      </MapStyled>
    </MapSearchStyled>
  );
}

export default React.memo(SearchMap);
