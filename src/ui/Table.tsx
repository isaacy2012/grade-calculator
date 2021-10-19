import React from "react";
import HeaderRow from "./HeaderRow";
import styled from "styled-components";

const WiderDiv = styled.div`
  margin: auto;
  width: min(650px, 95vw);
`

export default function Table(
    props: { headers: string[], children?: React.ReactNode }
) {

    return (
        <WiderDiv>
            <HeaderRow headers={props.headers}/>
            {props.children}
        </WiderDiv>
    );
}
