import React from "react";
import HeaderRow from "./HeaderRow";
import styled from "styled-components";
import {FlexChild6, FlexDiv } from "./Flex";
import { SpacerDiv } from "./SpacerDiv";

const WiderSection = styled.section`
  margin: auto;
  width: min(640px, 95vw);
`

export default function Table(
    props: { title: React.ReactNode, headers: string[], hints: string[], children?: React.ReactNode }
) {

    return (
        <WiderSection>
            <FlexDiv>
                <SpacerDiv/>
                <FlexChild6>
                    {props.title}
                </FlexChild6>
                <SpacerDiv/>
            </FlexDiv>
            <HeaderRow headers={props.headers} hints={props.hints}/>
            {props.children}
        </WiderSection>
    );
}
