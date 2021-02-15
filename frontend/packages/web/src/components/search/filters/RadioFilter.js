import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PT from "prop-types";
import { filterType } from "../../../types";

const RadioFilterStyled = styled.div`
  padding: 8px 24px;

  display: flex;
  flex-direction: column;

  .title {
    font-size: 24px;
    padding-bottom: 8px;
    text-transform: capitalize;
  }

  ul {
    padding: 0px;
    margin: 0px;
    list-style: none;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    justify-content: flex-start;
  }

  li {
    white-space: nowrap;

    input {
      appearance: checkbox;
      margin-right: 4px;
    }
    label {
      text-transform: capitalize;
      font-size: 14px;
    }
  }
`;

function RadioFilter({ title, options, initialValue, onChangeCallback }) {
  const [isChecked, setIsChecked] = useState(initialValue);

  const updateValue = (id, value) => {
    if (!isChecked[id]) {
      /* If we are turning one element ON, turn OFF all the other elements */
      setIsChecked(isChecked.map((elm, idx) => (idx === id ? value : false)));
    } else if (isChecked[id]) {
      /* If we are turning one element OFF, simply turn it off */
      setIsChecked(isChecked.map((elm, idx) => (idx === id ? false : elm)));
    }
  };

  useEffect(() => {
    onChangeCallback(isChecked);
  }, [isChecked]);

  return (
    <RadioFilterStyled>
      <span className="title">{title}</span>
      <ul>
        {options.map((option, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={idx}>
            <input
              type="checkbox"
              id={`${title}_${option}_${idx}`}
              checked={isChecked[idx]}
              onChange={(e) => updateValue(idx, e.target.checked)}
            />
            <label htmlFor={`${title}_${option}_${idx}`}>{option}</label>
          </li>
        ))}
      </ul>
    </RadioFilterStyled>
  );
}

export const RadioFilterPropTypes = {
  title: PT.string.isRequired,
  options: PT.arrayOf(PT.string).isRequired,
  initialValue: PT.arrayOf(PT.bool).isRequired,
  onChangeCallback: PT.func.isRequired,
};

RadioFilter.propTypes = RadioFilterPropTypes;
RadioFilter.defaultProps = {};

export default RadioFilter;
