import React from "react";

export default function SearchFilterRadio(props) {
  return (
    <div>
      {props.settings.title}
      <div>
        <input
          type="range"
          name={props.settings.title}
          min={props.settings.min}
          max={props.settings.max}
        />
      </div>
    </div>
  );
}
