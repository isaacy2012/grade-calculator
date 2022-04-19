import React, {Fragment, useMemo, useState} from "react";
import {H3, H3First} from "./H3";
import {Assignment} from "../../model/Assignment";
import {InputChangeEvent} from "../StyledInput";
import AutosizeInput from "react-input-autosize";
import {AlreadyFinalPercentageResult, OkResult, PercentageResult} from "../../model/PercentageResult";
import {DEFAULT_OUT_OF} from "../../constant/Constants";
import {Display, Hi, Or, UtilityText} from "./TabComponents";

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export default function PercentageTab(props: { assignments: Assignment[], threshState: State<string>, outOfState: State<string> }) {
    const assignments = props.assignments;

    const [threshStr, setThreshStr] = props.threshState;
    const [outOfStr, setOutOfStr] = props.outOfState;

    const outOf = useMemo(() => parseFloat(outOfStr), [outOfStr]);
    const result = useMemo(() =>
            PercentageResult.create(assignments, threshStr, !isNaN(outOf) ? outOf : DEFAULT_OUT_OF),
        [assignments, threshStr, outOf]
    );

    if (result instanceof AlreadyFinalPercentageResult) {
        return (
            <Fragment>
                <H3First>Final Result</H3First>
                {result.message()}
                <Display><Hi enabled={true}>{result.percentageStr()}</Hi></Display><UtilityText>%</UtilityText>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <H3First>Desired Percentage</H3First>
            <UtilityText>
                <AutosizeInput value={threshStr}
                               maxLength={4}
                               inputStyle={{
                                   fontSize: "3rem",
                                   fontWeight: 500,
                                   border: "none",
                               }}
                               type="numeric"
                               placeholder="--"
                               onChange={(event: InputChangeEvent) =>
                                   setThreshStr(event.target.value.trim())
                               }
                />
                %
            </UtilityText>
            <H3>Required Result</H3>
            {result.message()}
            {result instanceof OkResult &&
                <span>
                        <Display marginRight="2px"><Hi
                            enabled={true}>{result.requiredPercentageStr()}</Hi></Display><UtilityText>%</UtilityText>
                        <Or>  or  </Or>
                        <Display><Hi
                            enabled={true}>{result.requiredAchievedStr()}</Hi><UtilityText>/</UtilityText></Display>
                        <AutosizeInput value={outOfStr}
                                       inputStyle={{
                                           fontSize: "3rem",
                                           fontWeight: 500,
                                           border: "none",
                                       }}
                                       maxLength={5}
                                       type="numeric"
                                       placeholder={DEFAULT_OUT_OF.toString()}
                                       onChange={(event: InputChangeEvent) =>
                                           setOutOfStr(event.target.value.trim())
                                       }/>
                    </span>
            }
        </Fragment>
    );

}
