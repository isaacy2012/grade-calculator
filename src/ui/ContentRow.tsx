import styled, {useTheme} from "styled-components";
import React, {ReactNode, useEffect, useState} from "react";
import {Assignment, parseNumOrPerc} from "../model/Assignment";
import {fractionRegex, numberRegex, percentageRegex} from "../model/Regex";
import {Score} from "../model/Score";
import {SpacerDiv} from "./SpacerDiv";
import {FlexChild6, FlexDiv} from "./Flex";
import {InputChangeEvent, StyledInput} from "./StyledInput";
import { IconButton } from "./IconButton";
import { IoCloseOutline, IoDuplicateSharp } from "react-icons/io5";

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

const Input = styled(StyledInput).attrs((props: { accepted: boolean, empty: boolean }) => ({
    accepted: props.accepted,
    empty: props.empty,
}))`
  font-size: 1em;
  color: ${({empty, accepted, theme}) => empty || accepted ? theme.color.text : theme.color.outlineReject};
  font-weight: ${({empty, accepted}) => empty || accepted ? "normal" : "bold"};
  width: 100%;
`

const RightInput = styled(Input)`
  text-align: right;
`

function orEmptyString(str: string | null | undefined) {
    return str ? str : "";
}

export default function ContentRow(
    props: {
        assignment: Assignment,
        onChange: (assignment: Assignment) => void,
        invalidate: () => void,
        onClick?: () => void
        onDuplicate?: () => void
        onDelete?: () => void
    }
) {
    const {onChange, invalidate, assignment} = props;
    const assignmentUUID = assignment.uuid;
    const theme: any = useTheme();

    const [nameStr, setNameStr] = useState<string>(orEmptyString(props.assignment.name));
    const [scoreStr, setScoreStr] = useState<string>(orEmptyString(props.assignment.score?.toInputString()));
    const [weightStr, setWeightStr] = useState<string>(orEmptyString(props.assignment.weight?.toString()));

    useEffect(() => {
        let strAssignment = Assignment.fromStrings(nameStr, scoreStr, weightStr, assignmentUUID);
        if (strAssignment) {
            onChange(strAssignment);
        } else {
            invalidate();
        }
    }, [nameStr, scoreStr, weightStr, onChange, invalidate, assignmentUUID])

    return (
        <FlexDiv>
            <SpacerDiv>
                {props.onClick === undefined &&
                // ×
                <IconButton fontSize="1.1em" onClick={props.onDuplicate}><IoDuplicateSharp/></IconButton>}
            </SpacerDiv>
            <FlexChild6>
                <ContentRowContainer onClick={props.onClick}>
                    <FirstContentCol>
                        <Input
                            value={nameStr}
                            placeholder={props.onClick ? "Assignment" : undefined}
                            accepted={nameStr !== ""}
                            empty={nameStr.length === 0}
                            onChange={(event: InputChangeEvent) => setNameStr(event.target.value)}
                        />
                    </FirstContentCol>
                    <ContentCol>
                        <Input
                            value={scoreStr}
                            placeholder={props.onClick ? "Score" : undefined}
                            accepted={Score.fromString(scoreStr) !== undefined}
                            empty={scoreStr.length === 0}
                            onChange={(event: InputChangeEvent) => setScoreStr(event.target.value.trim())}
                        />
                    </ContentCol>
                    <LastContentCol>
                        <RightInput
                            value={weightStr}
                            placeholder={props.onClick ? "Weight" : undefined}
                            accepted={parseNumOrPerc(weightStr) <= 1}
                            empty={weightStr.length === 0}
                            onChange={(event: InputChangeEvent) => setWeightStr(event.target.value.trim())}
                        />
                    </LastContentCol>
                </ContentRowContainer>
                <ContentUnderline/>
            </FlexChild6>
            <SpacerDiv>
                {props.onClick === undefined &&
                // ×
                <IconButton onClick={props.onDelete}><IoCloseOutline/></IconButton>}
            </SpacerDiv>
        </FlexDiv>
    );
}
