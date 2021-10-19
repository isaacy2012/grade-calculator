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

const Input = styled.input.attrs((props: {accepted: boolean}) => ({
    accepted: props.accepted,
}))`
  font-size: 1em;
  color: ${({accepted, theme}) => accepted ? theme.color.text : theme.color.outlineReject};
  font-weight: ${({accepted}) => accepted ? "normal" : "bold"};
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

function orEmptyString(str: string | undefined) {
    return str ? str : "";
}

export default function ContentRow(props: { assignment: Assignment, onChange: (assignment: Assignment) => void }) {
    const theme: any = useTheme();

    const [nameStr, setNameStr] = useState<string>(orEmptyString(props.assignment.name));
    const [scoreStr, setScoreStr] = useState<string>(orEmptyString(props.assignment.score?.toInputString()));
    const [weightStr, setWeightStr] = useState<string>(orEmptyString(props.assignment.weight?.toString()));

    useEffect(() => {
        let strAssignment = Assignment.fromStrings(nameStr, scoreStr, weightStr);
        if (strAssignment) {
            props.onChange(strAssignment);
        }
    }, [nameStr, scoreStr, weightStr, props])

    return (
        <div>
            <ContentRowContainer>
                <FirstContentCol>
                    <Input
                        value={nameStr}
                        accepted={props.assignment.name !== undefined}
                        onChange={(event: InputChangeEvent) => setNameStr(event.target.value)}
                    />
                </FirstContentCol>
                <ContentCol>
                    <Input
                        value={scoreStr}
                        accepted={scoreStr === props.assignment.score?.toInputString()}
                        onChange={(event: InputChangeEvent) => setScoreStr(event.target.value)}
                    />
                </ContentCol>
                <LastContentCol>
                    <RightInput
                        value={weightStr}
                        accepted={weightStr === props.assignment.weight?.toString()}
                        onChange={(event: InputChangeEvent) => setWeightStr(event.target.value)}
                    />
                </LastContentCol>
            </ContentRowContainer>
            <ContentUnderline/>
        </div>
    );
}
