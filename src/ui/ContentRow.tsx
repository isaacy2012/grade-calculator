import styled, {useTheme} from "styled-components";
import React, {ReactNode, useEffect, useState} from "react";
import {Assignment} from "../model/Assignment";
import {fractionRegex, numberRegex, percentageRegex} from "../model/Regex";
import {Score} from "../model/Score";

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

const Input = styled.input.attrs((props: {accepted: boolean, empty: boolean}) => ({
    accepted: props.accepted,
    empty: props.empty,
}))`
  font-size: 1em;
  color: ${({empty, accepted, theme}) => empty || accepted ? theme.color.text : theme.color.outlineReject};
  font-weight: ${({empty, accepted}) => empty || accepted ? "normal" : "bold"};
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

export default function ContentRow(props: { assignment: Assignment, onChange: (assignment: Assignment) => void, invalidate: () => void}) {
    const theme: any = useTheme();

    const [nameStr, setNameStr] = useState<string>(orEmptyString(props.assignment.name));
    const [scoreStr, setScoreStr] = useState<string>(orEmptyString(props.assignment.score?.toInputString()));
    const [weightStr, setWeightStr] = useState<string>(orEmptyString(props.assignment.weight?.toString()));

    useEffect(() => {
        let strAssignment = Assignment.fromStrings(nameStr, scoreStr, weightStr);
        if (strAssignment) {
            props.onChange(strAssignment);
        } else {
            props.invalidate();
        }
    }, [nameStr, scoreStr, weightStr, props])

    return (
        <div>
            <ContentRowContainer>
                <FirstContentCol>
                    <Input
                        value={nameStr}
                        placeholder="Assignment"
                        accepted={nameStr !== ""}
                        empty={nameStr.length === 0}
                        onChange={(event: InputChangeEvent) => setNameStr(event.target.value.trim())}
                    />
                </FirstContentCol>
                <ContentCol>
                    <Input
                        value={scoreStr}
                        placeholder="Score"
                        accepted={Score.fromString(scoreStr) !== undefined}
                        empty={scoreStr.length === 0}
                        onChange={(event: InputChangeEvent) => setScoreStr(event.target.value.trim())}
                    />
                </ContentCol>
                <LastContentCol>
                    <RightInput
                        value={weightStr}
                        placeholder="Weight"
                        accepted={numberRegex.test(weightStr) && parseFloat(weightStr) <= 1}
                        empty={weightStr.length === 0}
                        onChange={(event: InputChangeEvent) => setWeightStr(event.target.value.trim())}
                    />
                </LastContentCol>
            </ContentRowContainer>
            <ContentUnderline/>
        </div>
    );
}
