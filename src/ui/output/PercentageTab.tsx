import React, {Fragment, useState} from "react";
import {H3, H3First} from "./H3";
import {Assignment} from "../../model/Assignment";
import {StyledInput} from "../StyledInput";
import styled from "styled-components";
import {InputChangeEvent} from "../StyledInput";
import VariableWidthInput from "./VariableWidthInput";


const Display = styled.span`
  color: ${({theme}) => theme.color.text};
  font-weight: 500;
  font-size: 3rem;
`
const Hi = styled.span`
  color: ${({theme}) => theme.color.highlight};
`

const Percentage = styled.span`
  color: ${({theme}) => theme.color.utilityText};
`

const Or = styled.b`
  white-space: pre;
`

export default function PercentageTab(props: { assignments: Assignment[] }) {
    const [percentageStr, setPercentageStr] = useState("");
    const [outOfStr, setOutOfStr] = useState("");

    return (
        <Fragment>
            <H3First>Desired Percentage</H3First>
            <Percentage>
                <VariableWidthInput value={percentageStr}
                                    type="numeric"
                                    placeholder="95"
                                    onChange={(event: InputChangeEvent) =>
                                        setPercentageStr(event.target.value.trim())
                                    }
                />
                %
            </Percentage>
            <H3>Required Result</H3>
            <span>
                <Display><Hi>84.0</Hi></Display><Percentage>%</Percentage>
                <Or>  or  </Or>
                <Display><Hi>21</Hi>/</Display>
                <VariableWidthInput value={outOfStr}
                                    type="numeric"
                                    placeholder="100"
                                    onChange={(event: InputChangeEvent) =>
                                        setOutOfStr(event.target.value.trim())
                                    }/>
            </span>
        </Fragment>
    );
}
