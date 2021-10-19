import {useTheme} from "styled-components";
import React, {useState} from "react";
import {Instruction} from "./Instruction";
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

    function calculate(thresh: number): string {
        if (!assignments.every(it => it.accepted())) {
            return "Incorrect data";
        }
        let totalWeight = assignments.map((it: Assignment) => it.weight!)
            .reduce((prev: number, it: number) => prev + it, 0);
        let totalAchieved = assignments.reduce((prev: number, it: Assignment) => prev + it.score!.calc()*it.weight!, 0);
        let totalWeightLeft = 1-totalWeight;
        let requiredAmount = thresh-totalAchieved;
        let requiredPercentage = requiredAmount/totalWeightLeft;
        console.log("totalWeightLeft: " + totalWeightLeft + ", requiredAmount: " + requiredAmount + ", requiredPercentage: " + requiredPercentage);
        return "You need " + (requiredPercentage*100).toFixed(2) + "% in the last " + (totalWeightLeft*100).toFixed(2) + "% to reach " + (thresh*100) + "%";

    }

    return (
        <div>
            <Title>Grade Calculator</Title>
            <Instruction>Enter your assignment information, then choose whether you want to reach
                a <b>percentage</b> or <b>grade</b>.</Instruction>
            <Table headers={["ASSIGNMENT", "SCORE", "WEIGHT"]}>
                {assignments.map((value, index) => <ContentRow key={index} assignment={value}
                                                               onChange={(assignment: Assignment) => updateAssignment(assignment, index)}/>)}
            </Table>
            {/*{assignments.map((value, index) => <div key={index}>{value.toString()}</div>)}*/}
            {calculate(0.9)}
        </div>
    );
}
