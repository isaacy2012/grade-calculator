import React, {Fragment, ReactElement, useState} from "react";
import {H3, H3First} from "./H3";
import {Assignment} from "../../model/Assignment";
import {StyledInput} from "../StyledInput";
import styled from "styled-components";
import {InputChangeEvent} from "../StyledInput";
import VariableWidthInput from "./VariableWidthInput";
import {PercentageResult} from "./PercentageResult";


const Display = styled.span`
  color: ${({theme}) => theme.color.text};
  font-weight: 500;
  font-size: 3rem;
`
const Hi = styled.span.attrs((props: { enabled: boolean }) => ({
    enabled: props.enabled,
}))`
  color: ${({enabled, theme}) => enabled ? theme.color.highlight : theme.color.utilityText};
`

const UtilityText = styled.span`
  color: ${({theme}) => theme.color.utilityText};
`

const Or = styled.b`
  white-space: pre;
`

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>]


export default function PercentageTab(props: { assignments: Assignment[], threshState: State<string>, outOfState: State<string> }) {
    const assignments = props.assignments;
    const [threshStr, setThreshStr] = props.threshState;
    const [outOfStr, setOutOfStr] = props.outOfState;

    let defaultOutOf = 100;
    let outOf = parseFloat(outOfStr);
    const result = PercentageResult.create(assignments, threshStr, !isNaN(outOf) ? outOf : defaultOutOf);

    return (
        <Fragment>
            <H3First>Desired Percentage</H3First>
            <UtilityText>
                <VariableWidthInput value={threshStr}
                                    type="numeric"
                                    placeholder="95"
                                    onChange={(event: InputChangeEvent) =>
                                        setThreshStr(event.target.value.trim())
                                    }
                />
                %
            </UtilityText>
            <H3>Required Result</H3>
            {result.message()}
            <span>
                <Display><Hi
                    enabled={result.isValid()}>{result.requiredPercentageStr()}</Hi></Display><UtilityText>%</UtilityText>
                <Or>  or  </Or>
                <Display><Hi enabled={result.isValid()}>{result.requiredAchievedStr()}</Hi><UtilityText>/</UtilityText></Display>
                <VariableWidthInput value={outOfStr}
                                    type="numeric"
                                    placeholder={defaultOutOf.toString()}
                                    onChange={(event: InputChangeEvent) =>
                                        setOutOfStr(event.target.value.trim())
                                    }/>
            </span>
        </Fragment>
    );
}
