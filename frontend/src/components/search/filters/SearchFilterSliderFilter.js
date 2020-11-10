import React from "react";

export default function SearchFilterSlider(props) {
  return (
    <input
      type="range"
      name={props.filter.name}
      min={props.filter.min}
      max={props.filter.max}
      onMouseUp={(e) => {
        return props.onChangeCallback(e.target.value);
      }}
      key={`${props.filter.name}_${props.filter.id}`}
    />
  );
}
