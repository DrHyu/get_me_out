import React from "react";
import styled from "styled-components";

import PT from "prop-types";
import { Range, SliderTooltip, Handle } from "rc-slider";

import "rc-slider/assets/index.css";

const RangeFilterStyled = styled.div`
  padding: ${({ extraPadding }) =>
    extraPadding ? "8px 24px 32px 24px" : "8px 24px"};

  display: flex;
  flex-direction: column;

  .title {
    font-size: 24px;
    padding-bottom: 8px;
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
  tooltipTemplate,
}) {
  const handle = (props) => {
    // eslint-disable-next-line react/prop-types
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={tooltipTemplate(value)}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

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
        handle={tooltipTemplate ? handle : undefined}
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
  tooltipTemplate: PT.func,
};

RangeFilter.propTypes = RangeFilterPropTypes;
RangeFilter.defaultProps = {
  defaultValue: 0,
  step: undefined,
  marks: {},
  tooltipTemplate: undefined,
};

export default RangeFilter;
