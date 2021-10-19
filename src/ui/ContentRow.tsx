import styled, {useTheme} from "styled-components";
import React, {ReactNode, useEffect, useState} from "react";
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

const Input = styled.input`
  font-size: 1em;
  border: none;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border: none;
    text-decoration: underline;
  }
`

const RightInput = styled(Input)`
  text-align: right;
`

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>

export default function ContentRow(props: { assignment: Assignment, onChange: (assignment: Assignment) => void }) {
    const theme: any = useTheme();
    const [nameStr, setNameStr] = useState<string>(props.assignment.name);
    const [scoreStr, setScoreStr] = useState<string>(props.assignment.score.toString());
    const [weightStr, setWeightStr] = useState<string>(props.assignment.weight.toString());

    useEffect(() => {
        props.onChange(Assignment.ofStrings(nameStr, scoreStr, weightStr));
    }, [nameStr, scoreStr, weightStr, props])

    return (
        <div>
            <ContentRowContainer>
                <FirstContentCol>
                    <Input
                        value={nameStr}
                        onChange={(event: InputChangeEvent) => setNameStr(event.target.value)}
                    />
                </FirstContentCol>
                <ContentCol>
                    <Input
                        value={scoreStr}
                        onChange={(event: InputChangeEvent) => setScoreStr(event.target.value)}
                    />
                </ContentCol>
                <LastContentCol>
                    <RightInput
                        value={weightStr}
                        onChange={(event: InputChangeEvent) => setWeightStr(event.target.value)}
                    />
                </LastContentCol>
            </ContentRowContainer>
            <ContentUnderline/>
        </div>
    );
}
