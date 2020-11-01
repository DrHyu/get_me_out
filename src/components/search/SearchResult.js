import React from "react";

import "./search.css";

export default function SearchResult(props) {
  return (
    <div className="container search-result">
      <div className="row">
        <div className="col-4">
          <img src={props.result.img} alt="Some" />
        </div>
        <div className="col-8">
          <div className="container">
            <div className="row">
              <div className="col-3">{props.result.rating}/100</div>
              <div className="col-7">{props.result.name}</div>
              <div className="col-2">
                {props.result.open ? "Open" : "Closed"}
              </div>
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
