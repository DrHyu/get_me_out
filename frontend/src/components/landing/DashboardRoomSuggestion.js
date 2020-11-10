import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./landing.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

const RoomSuggestion = ({ room }) => {
  return (
    <div className="container room-suggestion">
      <div className="row">
        <div className="col-3 room-suggestion-img-container">
          <LazyLoadImage
            alt={placeHolder}
            src={room.img} // use normal <img> attributes as props
            effect="opacity"
          />
        </div>
        <div className="col-3 room-suggestion-room-stats-container">
          <div className="container">
            <div className="row">
              <div className="col">{room.rating}/100</div>
              <div className="col">{room.difficulty}</div>
              <div className="col">{room.open ? "Open" : "Closed"}</div>
              <FontAwesomeIcon icon={faCoffee} />
            </div>
          </div>
        </div>
        <div className="col-6 room-suggestion-room-description-container">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2>{room.name}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col">{room.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSuggestion;
