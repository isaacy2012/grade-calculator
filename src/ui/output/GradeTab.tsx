import React, {Fragment, useMemo, useState} from "react";
import {Assignment} from "../../model/Assignment";
import Select from 'react-select';
import {GRADE_RESOLVERS, LabelToGradeResolver} from "../../model/grade/GradeResolvers";
import AutosizeInput from "react-input-autosize";
import {InputChangeEvent} from "../StyledInput";
import {DEFAULT_OUT_OF} from "../../constant/Constants";
import {Display, H3, H3First, Hi, Or, State, UtilityText} from "../helpers/Helpers";
import {theme} from "../../theme/Theme";
import {AlreadyFinalGradeResult, GradeResult} from "../../model/GradeResult";
import {OkResult} from "../../model/Result";


export default function GradeTab(props: { assignments: Assignment[], outOfState: State<string>, currentGradeResolverPairState: State<LabelToGradeResolver | null> }) {
    const assignments = props.assignments;

    const [desiredGradeStr, setDesiredGradeStr] = useState("");
    const [outOfStr, setOutOfStr] = props.outOfState;
    const [currentGradeResolverPair, setCurrentGradeResolverPair] = props.currentGradeResolverPairState;
    const outOf = useMemo(() => parseFloat(outOfStr), [outOfStr]);


    const result = useMemo(() => {
            if (currentGradeResolverPair != null) {
                return GradeResult.create(currentGradeResolverPair.value, assignments, desiredGradeStr, !isNaN(outOf) ? outOf : DEFAULT_OUT_OF)
            }
            return null
        },
        [currentGradeResolverPair, assignments, desiredGradeStr, outOf]
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
                value={currentGradeResolverPair}
                onChange={opt => setCurrentGradeResolverPair(opt)}
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
                    <AutosizeInput value={desiredGradeStr}
                                   maxLength={4}
                                   inputStyle={{
                                       fontSize: "3rem",
                                       fontWeight: 500,
                                       border: "none",
                                   }}
                                   placeholder="--"
                                   onChange={(event: InputChangeEvent) =>
                                       setDesiredGradeStr(currentGradeResolverPair?.value?.caseSensitive === false ?
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
