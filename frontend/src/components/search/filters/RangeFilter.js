import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import PT from "prop-types";
import { Range, SliderTooltip, Handle } from "rc-slider";

import "rc-slider/assets/index.css";

// const { createSliderWithTooltip } = Slider;
// const Range = createSliderWithTooltip(Slider.Range);
// const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value}`}
      visible
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const RangeFilterStyled = styled.div`
  padding: ${({ extraPadding }) =>
    extraPadding ? "8px 24px 32px 24px" : "8px 24px"};

  display: flex;
  flex-direction: column;

  .title {
    font-size: 24px;
    padding-bottom: 16px;
    text-transform: capitalize;
  }
  .rc-slider-handle:active {
    box-shadow: 0 0 5px ${({ theme }) => theme.primary} !important;
  }
  .rc-slider-track {
    background-color: ${({ theme }) => theme.primary} !important;
  }
  .rc-slider-dot-active {
    border-color: ${({ theme }) => theme.primary} !important;
  }
  .rc-slider-handle {
    border-color: ${({ theme }) => theme.primary} !important;
  }
  .rc-slider-handle-dragging {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary} !important;
  }
`;

function RangeFilter({
  title,
  min,
  max,
  defaultValue,
  step,
  marks,
  onChangeCallback,
}) {
  const themeContext = useContext(ThemeContext);

  console.log("Current theme: ", themeContext);

  return (
    /* If 'marks' (anotations for evry point) are passed, 
    extra padding is needed since the anotations are added with position obsolute */
    <RangeFilterStyled extraPadding={marks !== undefined}>
      <span className="title">{title}</span>
      <Range
        min={min}
        max={max}
        marks={marks}
        step={step}
        onChange={onChangeCallback}
        dots={step === undefined ? undefined : true}
        handle={marks === undefined ? handle : undefined}
      />
    </RangeFilterStyled>
  );
}

export const RangeFilterPropTypes = {
  title: PT.string.isRequired,
  min: PT.number.isRequired,
  max: PT.number.isRequired,
  defaultValue: PT.number,
  step: PT.number,
  marks: PT.shape({}),
  onChangeCallback: PT.func.isRequired,
};

RangeFilter.propTypes = RangeFilterPropTypes;
RangeFilter.defaultProps = {
  defaultValue: 0,
  step: undefined,
  marks: {},
};

export default RangeFilter;
