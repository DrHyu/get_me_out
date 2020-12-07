import React, { useState } from "react";
import styled from "styled-components";

import PT from "prop-types";

import { filterType } from "../../types";

export const RANGE_FILTER = "RANGE_FILTER";
export const CHOICE_FILTER = "CHOICE_FILTER";
export const DATE_FILTER = "DATE_FILTER";
export const MULT_CHOICE_FILTER = "MULT_CHOICE_FILTER";

const FilterBoxStyle = styled.div`
  border: 1px solid black;

  .title {
    font-weight: bold;
    font-size: 1em;
    padding-bottom: 1em;
  }

  padding: 15px;

  .options-container {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    flex-wrap: wrap;

    justify-content: space-arround;
  }

  .options-items {
    flex-basis: 100%;

    margin-left: 10px;
  }

  .slider {
    flex-basis: 100%;
  }

  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  li {
    padding: 0px 0.3em;

    input {
      margin: 0px 2px 0px 0px;
      appearance: checkbox;
    }

    label {
      text-transform: capitalize;
    }
  }
`;

export function MultipleChoiceFilter({ filter, onChangeCallback }) {
  const [isChecked, setIsChecked] = useState(filter.value);

  const updateValue = (id, value) => {
    setIsChecked(isChecked.map((elm, idx) => (idx === id ? value : elm)));
    onChangeCallback(isChecked);
  };

  return (
    <ul className="options-container">
      {filter.options.map((option, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <li className="options-items" key={idx}>
          <input
            type="checkbox"
            id={`${filter.name}_${option}_${idx}`}
            checked={isChecked[idx]}
            onChange={(e) => updateValue(idx, e.target.checked)}
          />
          <label htmlFor={`${filter.name}_${option}_${idx}`}>{option}</label>
        </li>
      ))}
    </ul>
  );
}

export function RadioFilter({ filter, onChangeCallback }) {
  const [isChecked, setIsChecked] = useState(filter.value);

  const updateValue = (id, value) => {
    /* Only if not selected -> selected */
    if (!isChecked[id] && value) {
      setIsChecked(isChecked.map((elm, idx) => (idx === id ? value : false)));
      onChangeCallback(isChecked);
    }
  };

  return (
    <ul className="options-container">
      {filter.options.map((option, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={idx}>
          <input
            type="checkbox"
            id={`${filter.name}_${option}_${idx}`}
            checked={isChecked[idx]}
            onChange={(e) => updateValue(idx, e.target.checked)}
          />
          <label htmlFor={`${filter.name}_${option}_${idx}`}>{option}</label>
        </li>
      ))}
    </ul>
  );
}

export function SliderFilter({ filter, onChangeCallback }) {
  return (
    <div className="options-container">
      <input
        className="slider"
        type="range"
        name={filter.name}
        min={filter.min}
        max={filter.max}
        onMouseUp={(e) => onChangeCallback(e.target.value)}
        key={`${filter.name}_${filter.id}`}
      />
    </div>
  );
}

export const filterKindToComponent = {
  RANGE_FILTER: SliderFilter,
  CHOICE_FILTER: RadioFilter,
  MULT_CHOICE_FILTER: MultipleChoiceFilter,
};

export function BaseFilter({ filter, onChangeCallback }) {
  const SomeFilterComponent = filterKindToComponent[filter.kind];
  return (
    <FilterBoxStyle>
      <span className="title">{filter.name}</span>
      <div>
        <SomeFilterComponent
          filter={filter}
          onChangeCallback={onChangeCallback}
        />
      </div>
    </FilterBoxStyle>
  );
}

const propTypes = {
  filter: filterType.isRequired,
  onChangeCallback: PT.func.isRequired,
};

BaseFilter.propTypes = propTypes;
MultipleChoiceFilter.propTypes = propTypes;
RadioFilter.propTypes = propTypes;
SliderFilter.propTypes = propTypes;
