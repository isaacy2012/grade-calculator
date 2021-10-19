import React from "react";
import HeaderRow from "./HeaderRow";
import styled from "styled-components";

const WiderSection = styled.section`
  margin: auto;
  width: min(650px, 95vw);
`

export default function Table(
    props: { headers: string[], children?: React.ReactNode }
) {

    return (
        <WiderSection>
            <HeaderRow headers={props.headers}/>
            {props.children}
        </WiderSection>
    );
}
