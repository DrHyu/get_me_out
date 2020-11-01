import React, { useState } from "react";

import { updateFilterValue } from "../../../store/actions/searchActions";

export default function SearchFilterSlider(props) {
  return (
    <div>
      {props.settings.name}
      <div>
        <input
          type="range"
          name={props.settings.name}
          min={props.settings.min}
          max={props.settings.max}
          onMouseUp={(e) => {
            return props.onChangeCallback(e.target.value);
          }}
          key={`${props.settings.name}_${props.settings.id}`}
        />
      </div>
    </div>
  );
}
