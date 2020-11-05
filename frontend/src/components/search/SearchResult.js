import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./search.css";

const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

export default function SearchResult(props) {
  return (
    <div className="container search-result">
      <div className="row">
        <div className="col-4">
          <LazyLoadImage
            alt={placeHolder}
            src={props.result.img} // use normal <img> attributes as props
            effect="opacity"
          />
        </div>
        <div className="col-8">
          <div className="container">
            <div className="row">
              <div className="col">{props.result.rating}/100</div>
              <div className="col">{props.result.name}</div>
              <div className="col">{props.result.difficulty}</div>
              <div className="col">{props.result.open ? "Open" : "Closed"}</div>

            </div>
          </div>
          <div className="row">
            <div className="col">{props.result.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
