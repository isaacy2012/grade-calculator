import React, {Fragment, useMemo, useState} from "react";
import {H3, H3First} from "./H3";
import {Assignment} from "../../model/Assignment";
import Select from 'react-select';
import {GRADE_RESOLVERS} from "../../model/grade/GradeResolvers";
import AutosizeInput from "react-input-autosize";
import {InputChangeEvent} from "../StyledInput";
import {OkResult} from "../../model/PercentageResult";
import {DEFAULT_OUT_OF} from "../../constant/Constants";
import {Display, Hi, Or, UtilityText} from "./TabComponents";
import {theme} from "../../theme/Theme";
import {AlreadyFinalGradeResult, GradeResult} from "../../model/GradeResult";
import {GradeResolver} from "../../model/grade/Grade";


export default function GradeTab(props: {assignments: Assignment[]}) {
    const assignments = props.assignments;

    const [threshStr, setThreshStr] = useState("");
    const [outOfStr, setOutOfStr] = useState("");
    const outOf = useMemo(() => parseFloat(outOfStr), [outOfStr]);

    const [currentGradeResolver, setCurrentGradeResolver] = useState<GradeResolver | null>(null);

    const result = useMemo(() => {
            if (currentGradeResolver != null) {
                return GradeResult.create(currentGradeResolver, assignments, threshStr, !isNaN(outOf) ? outOf : DEFAULT_OUT_OF)
            }
            return null
        },
        [currentGradeResolver, assignments, threshStr, outOf]
    );

    if (result instanceof AlreadyFinalGradeResult) {
        return (
            <Fragment>
                <H3First>Final Result</H3First>
                {result.message()}
                <Display><Hi enabled={true}>{result.gradeStr()}</Hi></Display>
            </Fragment>
        );
    }

    return(
        <Fragment>
            <H3First>Your School</H3First>
            <Select
                options={GRADE_RESOLVERS}
                onChange={opt => setCurrentGradeResolver(opt != null ? opt.value : null)}
                theme={(selectTheme) => ({
                    ...selectTheme,
                    colors: {
                        ...selectTheme.colors,
                        primary: theme.color.highlight,
                        primary75: theme.color.primary75,
                        primary50: theme.color.primary50,
                        primary25: theme.color.primary25
                    }
                })}
            />
            {result != null &&
                <Fragment>
                <H3>Desired Grade</H3>
                <UtilityText>
                    <AutosizeInput value={threshStr}
                                   maxLength={4}
                                   inputStyle={{
                                       fontSize: "3rem",
                                       fontWeight: 500,
                                       border: "none",
                                   }}
                                   placeholder="--"
                                   onChange={(event: InputChangeEvent) =>
                                       setThreshStr(currentGradeResolver?.caseSensitive === false ?
                                           event.target.value.trim().toUpperCase() :
                                           event.target.value.trim()
                                       )
                                   }
                    />
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
            }
        </Fragment>
    );
}
