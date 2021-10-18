import {useTheme} from "styled-components";
import React from "react";
import { Instruction } from "./Instruction";
import Title from "./Title";
import Table from "./Table";


export default function MainScreen() {
    const theme: any = useTheme();

    return (
        <div>
            <Title>Grade Calculator</Title>
            <Instruction>Enter your assignment information, then choose whether you want to reach a <b>percentage</b> or <b>grade</b>.</Instruction>
            <Table headers={["Assignment", "Score", "Weight"]}>

            </Table>
        </div>
    );
}
