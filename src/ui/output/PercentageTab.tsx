import React, {Fragment, useState} from "react";
import {H3} from "./H3";
import {Assignment} from "../../model/Assignment";
import {StyledInput} from "../StyledInput";
import styled from "styled-components";
import {InputChangeEvent} from "../StyledInput";
import VariableWidthInput from "./VariableWidthInput";


const Percentage = styled.span`
  color: ${({theme}) => theme.color.utilityText};
`

export default function PercentageTab(props: { assignments: Assignment[] }) {

    const [percentageStr, setPercentageStr] = useState("");

    return (
        <Fragment>
            <H3>Desired Percentage</H3>
            <Percentage>
                <VariableWidthInput value={percentageStr}
                                    placeholder="95"
                                    onChange={(event: InputChangeEvent) =>
                                        setPercentageStr(event.target.value.trim())
                                    }
                />
                %
            </Percentage>
        </Fragment>
    );
}
