import {useTheme} from "styled-components";
import React, {useState} from "react";
import { Instruction } from "./Instruction";
import Title from "./Title";
import Table from "./Table";
import {Assignment} from "../model/Assignment";
import ContentRow from "./ContentRow";

const dummyAssignments = [
    new Assignment("Assignment1", 0.77, 0.1),
    new Assignment("Assignment2", 0.89, 0.1),
    new Assignment("Assignment3", 0.94, 0.1),
    new Assignment("Project1", 0.94, 0.20),
    new Assignment("Project2", 0.66, 0.20),
]

export default function MainScreen() {
    const [assignments, setAssignments] = useState<Assignment[]>(dummyAssignments);

    return (
        <div>
            <Title>Grade Calculator</Title>
            <Instruction>Enter your assignment information, then choose whether you want to reach a <b>percentage</b> or <b>grade</b>.</Instruction>
            <Table headers={["ASSIGNMENT", "SCORE", "WEIGHT"]}>
                {assignments.map(value => <ContentRow assignment={value}/>)}
            </Table>
        </div>
    );
}
