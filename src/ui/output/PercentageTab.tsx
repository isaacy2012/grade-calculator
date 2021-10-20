import React, {Fragment, ReactElement, useState} from "react";
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

function numToPercentageStr(num: number): string {
    return (num*100).toFixed(2);
}

export default function PercentageTab(props: { assignments: Assignment[] }) {
    const assignments = props.assignments.slice(0, -1);
    const [threshStr, setThreshStr] = useState("");
    const [outOfStr, setOutOfStr] = useState("");

    let valid = false;
    let alreadyReached = false;
    let cantReach = false;
    let requiredPercentageStr = "--";
    let requiredAchievedStr = "--";
    let totalWeightLeftStr = "--";
    let totalAchievedStr = "--";
    let theoreticalMaximumStr = "--";
    let thresh = parseFloat(threshStr);
    function calculate() {
        if (!isNaN(thresh) && assignments.every(it => it.accepted())) {
            let totalWeight = assignments.map((it: Assignment) => it.weight!)
                .reduce((prev: number, it: number) => prev + it, 0);
            let totalAchieved = assignments.reduce((prev: number, it: Assignment) => prev + it.score!.calc() * it.weight!, 0);
            totalAchievedStr = numToPercentageStr(totalAchieved);
            let totalWeightLeft = 1 - totalWeight;
            totalWeightLeftStr = numToPercentageStr(totalWeightLeft);
            let theoreticalMaximum = totalAchieved + totalWeightLeft;
            theoreticalMaximumStr = numToPercentageStr(theoreticalMaximum);
            let requiredAmount = thresh / 100 - totalAchieved;
            let requiredPercentage = requiredAmount / totalWeightLeft;
            console.log("totalWeightLeft: " + totalWeightLeft + ", requiredAmount: " + requiredAmount + ", requiredPercentage: " + requiredPercentage);
            // return "You need " + (requiredPercentage * 100).toFixed(2) + "% in the last " + (totalWeightLeft * 100).toFixed(2) + "% to reach " + (thresh * 100) + "%";
            if (requiredPercentage < 0) {
                alreadyReached = true;
                return;
            } else if (requiredPercentage > 1) {
                cantReach = true;
            }
            requiredPercentageStr = numToPercentageStr(requiredPercentage);
            let requiredAchieved = (requiredPercentage * parseFloat(outOfStr));
            requiredAchievedStr = !isNaN(requiredAchieved) ? requiredAchieved.toFixed(2) : requiredPercentageStr;
            valid = true;
        }
    }
    calculate();

    function message(): ReactElement {
        if (alreadyReached) {
            return <p>Congratulations, you have already reached <b>{totalAchievedStr}%</b>!</p>;
        } else if (cantReach) {
            return <p>Unfortunately, you can't reach {threshStr}%. The maximum percentage you can achieve is <b>{theoreticalMaximumStr}%</b></p>;
        } else {
            return <p>Over the remaining <b>{totalWeightLeftStr}%</b>, you need:</p>;
        }
    }


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
            {valid && message()}
            <span>
                <Display><Hi enabled={valid}>{requiredPercentageStr}</Hi></Display><UtilityText>%</UtilityText>
                <Or>  or  </Or>
                <Display><Hi enabled={valid}>{requiredAchievedStr}</Hi><UtilityText>/</UtilityText></Display>
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
