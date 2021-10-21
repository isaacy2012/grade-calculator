import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Assignment, parseNumOrPerc} from "../model/Assignment";
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
  flex: 1.5;
`

const LastContentCol = styled.p`
  text-align: end;
  flex: 1.5;
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
  text-decoration: ${({empty}) => empty ? "underline" : "none"};
`

const RightInput = styled(Input)`
  text-align: right;
`

export default function ContentRow(
    props: {
        assignment: Assignment,
        onChange: (assignment: Assignment) => void,
        onClick?: () => void
        onDuplicate?: () => void
        onDelete?: () => void
    }
) {
    const {onChange, assignment, onClick} = props;
    const assignmentUUID = assignment.uuid;

    const [nameStr, setNameStr] = useState<string>(assignment.getNameStr());
    const [scoreStr, setScoreStr] = useState<string>(assignment.getScoreStr());
    const [weightStr, setWeightStr] = useState<string>(assignment.getWeightStr());

    useEffect(() => {
        if (onClick === undefined) {
            let strAssignment = Assignment.fromStrings(nameStr, scoreStr, weightStr, assignmentUUID);
            onChange(strAssignment);
        }
    }, [onClick, nameStr, scoreStr, weightStr, onChange, assignmentUUID])

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
                            placeholder={"Name"}
                            accepted={nameStr !== ""}
                            empty={nameStr.length === 0}
                            onChange={(event: InputChangeEvent) => setNameStr(event.target.value)}
                        />
                    </FirstContentCol>
                    <ContentCol>
                        <Input
                            value={scoreStr}
                            placeholder={"Score Achieved"}
                            accepted={Score.fromString(scoreStr) !== null}
                            empty={scoreStr.length === 0}
                            onChange={(event: InputChangeEvent) => setScoreStr(event.target.value.trim())}
                        />
                    </ContentCol>
                    <LastContentCol>
                        <RightInput
                            value={weightStr}
                            placeholder={"Overall Weight"}
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
