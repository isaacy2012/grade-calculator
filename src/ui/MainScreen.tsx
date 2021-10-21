import styled from "styled-components";
import React, {Fragment, useCallback, useEffect, useState} from "react";
import {Instruction} from "./Instruction";
import Title from "./Title";
import Table from "./Table";
import {Assignment} from "../model/Assignment";
import ContentRow from "./ContentRow";
import {Score} from "../model/Score";
import {Container} from "./Container";
import {InputChangeEvent, StyledInput} from "./StyledInput";
import Tabbed from "./Tabbed";
import Tab from "./Tab";
import {v4 as uuidv4} from "uuid";
import PercentageTab from "./output/PercentageTab";
import GradeTab from "./output/GradeTab";
import {encode, decode} from "base-64";
import {useHistory, useLocation} from "react-router-dom";
import {parseJSON} from "../util/Deserializer";
import {NoPaddingCard} from "./Card";
import {RiShareForward2Fill} from "react-icons/ri";
import ShareSheet from "./ShareSheet";


const TableHeader = styled(StyledInput)`
  width: 100%;
  font-size: 2em;
  font-weight: bold;
  border: none;
`

const InvisibleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  white-space: pre;
  font-size: 1.1em;
  //font-weight: 600;
  margin: 0;
  padding: 15px;
  width: 100%;
  background: none;
  border: none;
  border-radius: 10px;

    // color: ${({theme}) => theme.color.outlineReject};
`

const dummyAssignments: Assignment[] = [
    new Assignment(true, "Assignment 1", Score.fromString("49/50")!, 0.025, uuidv4()),
    new Assignment(true, "Project 1", Score.fromString("98/100")!, 0.15, uuidv4()),
    new Assignment(true, "Assignment 2", Score.fromString("47/50")!, 0.025, uuidv4()),
    new Assignment(true, "Assignment 3", Score.fromString("40/40")!, 0.025, uuidv4()),
    new Assignment(true, "Project 2", Score.fromString("43/43")!, 0.15, uuidv4()),
    new Assignment(true, "Assignment 4", Score.fromString("24.5/30")!, 0.025, uuidv4()),
]

const defaultAssignments: Assignment[] = []

/**
 * getQuery from location for id string
 */
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function MainScreen() {
    const [assignments, setAssignments] = useState<Assignment[]>([...dummyAssignments, Assignment.ofEmpty()]);
    const [shareExpanded, setShareExpanded] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const percentageThreshState = useState("");
    const outOfState = useState("");

    let queryString = useQuery().get("saved");
    let fillSavedAssignments = useCallback(() => {
        if (queryString) {
            let loadedData = parseJSON(decode(queryString));
            if (loadedData !== null) {
                setTitle(loadedData.title);
                setAssignments([
                    ...loadedData.assignments,
                    Assignment.ofEmpty()
                ]);
            }
        }
    }, [queryString])

    useEffect(() => {
        fillSavedAssignments();
    }, [fillSavedAssignments]);

    function deleteAssignment(index: number) {
        setAssignments((currentAssignments) => {
            let newArr = [...currentAssignments];
            newArr.splice(index, 1);
            console.log(newArr)
            return newArr;
        });
    }

    function updateAssignment(assignment: Assignment, index: number) {
        if (assignments[index].equals(assignment)) {
            return;
        }
        setAssignments((currentAssignments) => {
            let newArr = [...currentAssignments];
            newArr[index] = assignment;
            return newArr;
        });
    }

    function invalidateAssignment(index: number) {
        if (!assignments[index].valid) {
            return;
        }
        setAssignments((currentAssignments) => {
            let newArr = [...currentAssignments];
            newArr[index].valid = false;
            return newArr;
        });

    }

    function addRow() {
        setAssignments((currentAssignments) => {
            let newArr = [...currentAssignments];
            newArr.push(Assignment.ofEmpty());
            return newArr;
        });
    }

    return (
        <Fragment>
            <Container bottom="50px">
                <Title>Grade Calculator</Title>
                <Instruction>Enter your assignment information, then choose whether you want to reach
                    a <b>percentage</b> or <b>grade</b>.</Instruction>
            </Container>
            <Table title={
                <TableHeader
                    value={title}
                    onChange={(event: InputChangeEvent) => setTitle(event.target.value)}
                    placeholder="Title"/>
            } headers={["ASSIGNMENT", "SCORE", "WEIGHT"]}>
                {assignments.map((value, index) => <ContentRow
                    key={value.uuid}
                    assignment={value}
                    onChange={(assignment: Assignment) => updateAssignment(assignment, index)}
                    invalidate={() => invalidateAssignment(index)}
                    onClick={index === assignments.length - 1 ? addRow : undefined}
                    onDelete={() => deleteAssignment(index)}
                />)}
            </Table>
            <Container top="20px">
                <Tabbed defaultActiveTabName="REACH_PERCENTAGE"
                        headerNames={["REACH_PERCENTAGE", "REACH_GRADE"]}
                        headerElements={[<span>% Reach a <b>percentage</b></span>,
                            <span>A+ Reach a <b>grade</b></span>]}>
                    <Tab tabName="REACH_PERCENTAGE">
                        {/*remove the last empty assignment (the add button)*/}
                        <PercentageTab assignments={assignments.slice(0, -1)}
                                       threshState={percentageThreshState}
                                       outOfState={outOfState}
                        />
                    </Tab>
                    <Tab tabName="REACH_GRADE">
                        {/*remove the last empty assignment (the add button)*/}
                        <GradeTab assignments={assignments.slice(0, -1)}/>
                    </Tab>
                </Tabbed>
            </Container>
            <Container>
                <NoPaddingCard marginTop="20px">
                    <InvisibleButton onClick={() => setShareExpanded((prev) => !prev)}>
                        <RiShareForward2Fill/> SHARE
                    </InvisibleButton>
                    {shareExpanded &&
                    <ShareSheet title={title} assignments={assignments.slice(0, -1)}/>}
                </NoPaddingCard>
            </Container>
            {/*{assignments.map((value, index) => <div key={index}>{value.toString()}</div>)}*/}
        </Fragment>
    );
}
