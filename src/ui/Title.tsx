import styled from "styled-components";
import React from "react";

const TitleContainer = styled.div`
  margin-left: 5%;
  margin-right: 5%;
`

const StyledTitle = styled.p`
  font-size: 3em;
  font-weight: 600;
  line-height: 1.1;
  text-align: start;
  padding-top: min(1.0em, 10vw);
  margin-top: 0;
  margin-bottom: 0;
  max-width: 50vw;
  color: ${({theme}) => theme.color.text};
  @media only screen and (min-width: 768px) {
    padding-top: 2em;
    max-width: 100vw;
    text-align: center;
  }
`

const Block = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
  width: 25%;
  height: 5px;
  background: ${({theme}) => theme.color.highlight};
  @media only screen and (min-width: 768px) {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
`

export function Title(props: { children: React.ReactNode }) {
    return (
        <TitleContainer>
            <StyledTitle>{props.children}</StyledTitle>
            <Block/>
        </TitleContainer>
    );
}

