import React, { useState } from "react";
import styled from "styled-components";

import PT from "prop-types";
import { filterType } from "../../../types";

const MultipleChoiceFilterStyled = styled.div`
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

function MultipleChoiceFilter({
  title,
  options,
  initialValue,
  onChangeCallback,
}) {
  const [isChecked, setIsChecked] = useState(initialValue);

  const updateValue = (id, value) => {
    setIsChecked(isChecked.map((elm, idx) => (idx === id ? value : elm)));
    onChangeCallback(isChecked);
  };

  return (
    <MultipleChoiceFilterStyled>
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
    </MultipleChoiceFilterStyled>
  );
}

export const MultipleChoiceFilterPropTypes = {
  title: PT.string.isRequired,
  options: PT.arrayOf(PT.string).isRequired,
  initialValue: PT.arrayOf(PT.bool).isRequired,
  onChangeCallback: PT.func.isRequired,
};

MultipleChoiceFilter.propTypes = MultipleChoiceFilterPropTypes;
MultipleChoiceFilter.defaultProps = {};

export default MultipleChoiceFilter;
