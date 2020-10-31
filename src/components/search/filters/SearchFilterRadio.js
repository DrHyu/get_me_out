import React from "react";

export default function SearchFilterRadio(props) {
  return (
    <div>
      {props.settings.title}
      {props.settings.values.map((option, idx) => (
        <div>
          <input
            type="radio"
            name={props.settings.title}
            id={option + props.settings.title}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}
