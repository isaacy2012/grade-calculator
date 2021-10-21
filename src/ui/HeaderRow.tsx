import styled from "styled-components";
import React, {ReactNode} from "react";
import {SpacerDiv} from "./SpacerDiv";
import {FlexChild6, FlexDiv } from "./Flex";

const FirstHeaderCol = styled.h3`
  text-align: start;
  flex: 3;
`
const HeaderCol = styled.h3`
  text-align: start;
  flex: 2;
`

const LastHeaderCol = styled.h3`
  text-align: end;
  flex: 1;
`

const HeaderRowContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const HeaderUnderline = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2px;
  background: ${({theme}) => theme.color.headerUnderline};
`

const makeHeaderItem = (value: string, index: number, len: number): ReactNode => {
    // first
    if (index === 0) {
        return <FirstHeaderCol key={index}>{value}</FirstHeaderCol>
    } else if (index === len - 1) { // last
        return <LastHeaderCol key={index}>{value}</LastHeaderCol>
    } else {
        return <HeaderCol key={index}>{value}</HeaderCol>
    }
}
export default function HeaderRow(props: { headers: string[] }) {

    return (
        <FlexDiv>
            <SpacerDiv/>
            <FlexChild6>
                <HeaderRowContainer>
                    {props.headers.map((value, index) => makeHeaderItem(value, index, props.headers.length))}
                </HeaderRowContainer>
                <HeaderUnderline/>
            </FlexChild6>
            <SpacerDiv/>
        </FlexDiv>
    );
}
