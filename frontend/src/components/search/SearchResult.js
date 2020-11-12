import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./search.css";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

export default function SearchResult({ result }) {
  return (
    <div className="container search-result">
      <div className="row">
        <div className="col-3 search-result-img-container">
          <LazyLoadImage
            alt={placeHolder}
            src={result.img} // use normal <img> attributes as props
            effect="opacity"
          />
        </div>
        <div className="col-3 search-result-room-stats-container">
          <div className="container">
            <div className="row">
              <div className="col">{result.rating}/100</div>
              <div className="col">{result.difficulty}</div>
              <div className="col">{result.open ? "Open" : "Closed"}</div>
              {/* <FontAwesomeIcon icon={faCoffee} /> */}
            </div>
          </div>
        </div>
        <div className="col-6 search-result-room-description-container">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2>{result.name}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col">{result.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
