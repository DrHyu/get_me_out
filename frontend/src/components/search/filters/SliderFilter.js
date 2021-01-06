import React, { useState } from "react";
import styled from "styled-components";

import PT from "prop-types";
import Slider, { SliderTooltip, Handle } from "rc-slider";

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
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const SliderFilterStyled = styled.div`
  padding: 8px 24px;

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

function SliderFilter({
  title,
  min,
  max,
  defaultValue,
  step,
  marks,
  onChangeCallback,
}) {
  return (
    <SliderFilterStyled>
      <span className="title">{title}</span>
      <Slider
        min={min}
        max={max}
        marks={marks}
        step={step}
        onChange={onChangeCallback}
        dots={step === undefined ? undefined : true}
        handle={handle}
      />
    </SliderFilterStyled>
  );
}

export const SliderFilterPropTypes = {
  title: PT.string.isRequired,
  min: PT.number.isRequired,
  max: PT.number.isRequired,
  defaultValue: PT.number,
  step: PT.number,
  marks: PT.shape({}),
  onChangeCallback: PT.func.isRequired,
};

SliderFilter.propTypes = SliderFilterPropTypes;
SliderFilter.defaultProps = {
  defaultValue: 0,
  step: undefined,
  marks: {},
};

export default SliderFilter;
