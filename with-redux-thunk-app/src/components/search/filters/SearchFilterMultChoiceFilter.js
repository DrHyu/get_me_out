import React from "react";

export default function SearchFilterMultChoiceFilter(props) {
  return (
    <ul>
      {props.filter.options.map((option, idx) => (
        <li key={idx}>
          <input
            type="checkbox"
            id={`${props.filter.name}_${option}_${idx}`}
            checked={props.filter.value[idx]}
            onChange={(e) => {
              return props.onChangeCallback(e.target.checked, idx);
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
