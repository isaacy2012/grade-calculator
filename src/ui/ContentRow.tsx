import styled, {useTheme} from "styled-components";
import React, {ReactNode} from "react";
import {Assignment} from "../model/Assignment";

const FirstContentCol = styled.p`
  text-align: start;
  flex: 3;
`
const ContentCol = styled.p`
  text-align: start;
  flex: 2;
`

const LastContentCol = styled.p`
  text-align: end;
  flex: 1;
`

const ContentRowContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ContentUnderline = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 1px;
  background: ${({theme}) => theme.color.contentUnderline};
`
export default function ContentRow( props: {assignment: Assignment}) {
    const theme: any = useTheme();

    return(
        <div>
            <ContentRowContainer>
                <FirstContentCol>{props.assignment.name}</FirstContentCol>
                <ContentCol>{props.assignment.score}</ContentCol>
                <LastContentCol>{props.assignment.weight}</LastContentCol>
            </ContentRowContainer>
            <ContentUnderline/>
        </div>
    );
}
