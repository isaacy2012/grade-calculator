import styled from "styled-components";
import React from "react";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>

export const StyledInput = styled.input`
  border: none;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: none;
    text-decoration: underline;
  }
`
