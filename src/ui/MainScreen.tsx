import styled from "styled-components";
import React, {useState} from "react";
import {Instruction} from "./Instruction";
import Title from "./Title";
import Table from "./Table";
import {Assignment} from "../model/Assignment";
import ContentRow from "./ContentRow";
import {Score} from "../model/Score";
import {Container} from "./Container";
import {StyledInput} from "./StyledInput";
import Tabbed from "./Tabbed";

const TableHeader = styled(StyledInput)`
  width: 100%;
  font-size: 2em;
  font-weight: bold;
  border: none;
`

const dummyAssignments = [
    new Assignment(true, "Assignment 1", Score.fromString("49/50")!, 0.025),
    new Assignment(true, "Project 1", Score.fromString("98/100")!, 0.15),
    new Assignment(true, "Assignment 2", Score.fromString("47/50")!, 0.025),
    new Assignment(true, "Assignment 3", Score.fromString("40/40")!, 0.025),
    new Assignment(true, "Project 2", Score.fromString("43/43")!, 0.15),
    new Assignment(true, "Assignment 4", Score.fromString("24.5/30")!, 0.025),
    Assignment.ofEmpty()
]

export default function MainScreen() {
    const [assignments, setAssignments] = useState<Assignment[]>(dummyAssignments);

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

    function calculate(thresh: number): string {
        if (!assignments.every(it => it.accepted())) {
            return "Incorrect data";
        }
        let totalWeight = assignments.map((it: Assignment) => it.weight!)
            .reduce((prev: number, it: number) => prev + it, 0);
        let totalAchieved = assignments.reduce((prev: number, it: Assignment) => prev + it.score!.calc() * it.weight!, 0);
        let totalWeightLeft = 1 - totalWeight;
        let requiredAmount = thresh - totalAchieved;
        let requiredPercentage = requiredAmount / totalWeightLeft;
        console.log("totalWeightLeft: " + totalWeightLeft + ", requiredAmount: " + requiredAmount + ", requiredPercentage: " + requiredPercentage);
        return "You need " + (requiredPercentage * 100).toFixed(2) + "% in the last " + (totalWeightLeft * 100).toFixed(2) + "% to reach " + (thresh * 100) + "%";

    }

    function addRow() {
        setAssignments((currentAssignments) => {
            let newArr = [...currentAssignments];
            newArr.push(Assignment.ofEmpty());
            return newArr;
        });
    }

    return (
        <div>
            <Container>
            <Title>Grade Calculator</Title>
            <Instruction>Enter your assignment information, then choose whether you want to reach
                a <b>percentage</b> or <b>grade</b>.</Instruction>
            </Container>
            <Table title={
                <TableHeader placeholder="Title"/>
            } headers={["ASSIGNMENT", "SCORE", "WEIGHT"]}>
                {assignments.map((value, index) => <ContentRow
                    key={JSON.stringify(value)}
                    assignment={value}
                    onChange={(assignment: Assignment) => updateAssignment(assignment, index)}
                    invalidate={() => invalidateAssignment(index)}
                    onClick={index === assignments.length-1 ? addRow : undefined}
                    onDelete={() => deleteAssignment(index)}
                />)}
            </Table>
            <Container>
                <Tabbed tab="percentage">
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                </Tabbed>
            </Container>
            {assignments.map((value, index) => <div key={index}>{value.toString()}</div>)}
            {calculate(0.9)}
        </div>
    );
}
