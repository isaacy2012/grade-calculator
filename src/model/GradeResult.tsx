import React, {ReactNode} from "react";
import {Assignment} from "./Assignment";
import {create, HMM, OkResult, Result} from "./PercentageResult";
import a from "indefinite";
import {GradeResolver} from "./grade/Grade";

export abstract class GradeResult implements Result {
    readonly gradeResolver: GradeResolver;

    constructor(gradeResolver: GradeResolver) {
        this.gradeResolver = gradeResolver;
    }

    abstract message(): ReactNode

    static create(gradeResolver: GradeResolver, assignments: Assignment[], threshStr: string, outOf: number): Result {
        return create(
            assignments,
            gradeResolver.gradeStrToNum(threshStr),
            outOf,
            (totalAchieved) => new AlreadyFinalGradeResult(gradeResolver, totalAchieved),
            () => new InvalidGradeResult(gradeResolver,
                threshStr === "" ? <span>Enter your desired percentage above.</span> :
                    <span>{HMM} the threshold <b>{threshStr}</b> isn't valid.</span>
            ),
            (totalAchieved) => new AlreadyReachedGradeResult(gradeResolver, totalAchieved),
            (requiredPercentage, requiredAchieved, theoreticalMaximum) =>
                new CantReachGradeResult(gradeResolver, threshStr, theoreticalMaximum),
            (requiredPercentage, requiredAchieved, totalWeightLeft) =>
                new OkResult(requiredPercentage, requiredAchieved, totalWeightLeft)
        )
    }
}



class InvalidGradeResult extends GradeResult {
    readonly messageElement: ReactNode;

    constructor(gradeResolver: GradeResolver, messageElement: React.ReactNode) {
        super(gradeResolver);
        this.messageElement = messageElement;
    }

    message(): ReactNode {
        return this.messageElement == null ? null : <p>{this.messageElement}</p>;
    }
}


export class AlreadyFinalGradeResult extends InvalidGradeResult {
    readonly totalAchieved: number;

    constructor(gradeResolver: GradeResolver, totalAchieved: number) {
        super(gradeResolver, null);
        this.totalAchieved = totalAchieved;
    }

    message(): ReactNode {
        return <p>Congratulations, you have already completed the course and achieved:</p>;
    }

    gradeStr(): string {
        return this.gradeResolver.numToGradeStr(this.totalAchieved);
    }
}

class AlreadyReachedGradeResult extends InvalidGradeResult {
    readonly totalAchieved: number;

    constructor(gradeResolver: GradeResolver, totalAchieved: number) {
        super(gradeResolver, null);
        this.totalAchieved = totalAchieved;
    }

    message(): ReactNode {
        return <p>Congratulations, you have already reached <b>{this.gradeResolver.numToGradeStr(this.totalAchieved)}</b>!</p>;
    }
}

class CantReachGradeResult extends InvalidGradeResult {
    readonly threshStr: string;
    readonly theoreticalMaximum: number;

    constructor(gradeResolver: GradeResolver, threshStr: string, theoreticalMaximum: number) {
        super(gradeResolver, null);
        this.threshStr = threshStr;
        this.theoreticalMaximum = theoreticalMaximum;
    }

    message(): ReactNode {
        const gradeStr = this.gradeResolver.numToGradeStr(this.theoreticalMaximum);
        if (this.threshStr.charAt(0))
        return <p>Unfortunately, you can't achieve {a(this.threshStr)}.<br/>The maximum grade you can achieve
            is {a(gradeStr, {articleOnly: true})} <b>{gradeStr}</b>.</p>;
    }
}


