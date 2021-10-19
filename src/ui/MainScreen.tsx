import {useTheme} from "styled-components";
import React, {useState} from "react";
import { Instruction } from "./Instruction";
import Title from "./Title";
import Table from "./Table";
import {Assignment} from "../model/Assignment";
import ContentRow from "./ContentRow";
import {Score} from "../model/Score";

const dummyAssignments = [
    new Assignment("Assignment1", Score.fromString("0.77")!, 0.1),
    new Assignment("Assignment2", Score.fromString("0.89")!, 0.1),
    new Assignment("Assignment3", Score.fromString("0.94")!, 0.1),
    new Assignment("Project1", Score.fromString("0.94")!, 0.20),
    new Assignment("Project2", Score.fromString("0.66")!, 0.20),
]

export default function MainScreen() {
    const [assignments, setAssignments] = useState<Assignment[]>(dummyAssignments);

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

    return (
        <div>
            <Title>Grade Calculator</Title>
            <Instruction>Enter your assignment information, then choose whether you want to reach a <b>percentage</b> or <b>grade</b>.</Instruction>
            <Table headers={["ASSIGNMENT", "SCORE", "WEIGHT"]}>
                {assignments.map((value, index) => <ContentRow key={index} assignment={value} onChange={(assignment: Assignment) => updateAssignment(assignment, index)}/>)}
            </Table>
            {assignments.map((value, index) => <div key={index}>{value.toString()}</div>)}
        </div>
    );
}
