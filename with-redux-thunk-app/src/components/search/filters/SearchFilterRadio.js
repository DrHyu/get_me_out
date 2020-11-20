import React from "react";

export default function SearchFilterRadio(props) {
  return (
    <div>
      <div>{props.settings.name}</div>
      {props.settings.options.map((option, idx) => (
        <div key={`${props.settings.name}_${option}_${idx}`}>
          <input
            type="radio"
            name={props.settings.name}
            id={`${props.settings.name}_${option}_${idx}`}
            checked={props.settings.value === idx ? true : false}
            onChange={() => {
              return props.onChangeCallback(idx);
            }}
          />
          <label htmlFor={`${props.settings.name}_${option}_${idx}`}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}
