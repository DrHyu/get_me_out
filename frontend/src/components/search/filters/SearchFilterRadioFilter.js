import React from "react";

export default function SearchFilterRadio(props) {
  return (
    <ul>
      {props.filter.options.map((option, idx) => (
        <li key={idx}>
          <input
            type="radio"
            name={props.filter.name}
            id={`${props.filter.name}_${option}_${idx}`}
            checked={props.filter.value === idx ? true : false}
            onChange={() => {
              return props.onChangeCallback(idx);
            }}
          />
          <label htmlFor={`${props.filter.name}_${option}_${idx}`}>
            {option}
          </label>
        </li>
      ))}
    </ul>
  );
}
