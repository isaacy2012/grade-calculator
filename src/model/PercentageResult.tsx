import React, {ReactNode} from "react";
import {Assignment, ValidAssignment} from "./Assignment";

const DIGITS = 2;
const DEFAULT_PERC_STR = "--";
const HMM = "Hmm... that doesn't seem right -";

export abstract class PercentageResult {
    abstract requiredPercentageStr(): string

    abstract requiredAchievedStr(): string

    abstract message(): ReactNode

    abstract isValid(): boolean

    nToPercStr(n: number): string {
        return (n * 100).toFixed(DIGITS);
    }

    static create(assignments: Assignment[], threshStr: string, outOf: number): PercentageResult {
        let threshNum = parseFloat(threshStr)
        if (!assignments.every(it => it instanceof ValidAssignment)) {
            return new InvalidPercentageResult(<span>You haven't filled in all the assignments.</span>);
        } else {
            let totalWeight = assignments.map((it: Assignment) => (it as ValidAssignment).weight!)
                .reduce((prev: number, it: number) => prev + it, 0);
            let totalAchieved = assignments.reduce((prev: number, it: Assignment) =>
                prev + (it as ValidAssignment).score.calc() * (it as ValidAssignment).weight, 0
            );
            let totalWeightLeft = 1 - totalWeight;
            if (totalWeightLeft < 0) {
                return new InvalidPercentageResult(
                    <span>{HMM} it looks like you've already completed <b>{(100-(totalWeightLeft * 100)).toFixed(DIGITS)}%</b> of the course.</span>);
            } else if (totalWeightLeft === 0) {
                return new AlreadyFinalResult(totalAchieved);
            }
            let theoreticalMaximum = totalAchieved + totalWeightLeft;
            if (isNaN(threshNum)) {
                return new InvalidPercentageResult(threshStr === "" ? <span>Enter your desired percentage above.</span> :
                    <span>{HMM} the threshold <b>{threshStr}</b> isn't valid.</span>);
            }
            let thresh = threshNum / 100;
            let requiredAmount = thresh - totalAchieved;
            let requiredPercentage = requiredAmount / totalWeightLeft;
            let requiredAchieved = (requiredPercentage * outOf);
            if (requiredPercentage <= 0) {
                return new AlreadyReachedResult(totalAchieved);
            } else if (requiredPercentage > 1) {
                return new CantReachPercentageResult(requiredPercentage, requiredAchieved, thresh, theoreticalMaximum);
            } else {
                return new OkPercentageResult(requiredPercentage, requiredAchieved, totalWeightLeft);
            }
        }
    }
}

abstract class ValidPercentageResult extends PercentageResult {
    readonly requiredPercentage: number;
    readonly requiredAchieved: number;


    protected constructor(requiredPercentage: number, requiredAchieved: number) {
        super();
        this.requiredPercentage = requiredPercentage;
        this.requiredAchieved = requiredAchieved;
    }

    requiredPercentageStr(): string {
        return this.nToPercStr(this.requiredPercentage);
    }

    requiredAchievedStr(): string {
        return this.requiredAchieved.toFixed(DIGITS);
    }

    isValid(): boolean {
        return true;
    }

}

class InvalidPercentageResult extends PercentageResult {
    readonly messageElement: ReactNode;

    constructor(messageStr: React.ReactNode) {
        super();
        this.messageElement = messageStr;
    }

    requiredPercentageStr(): string {
        return DEFAULT_PERC_STR;
    }

    requiredAchievedStr(): string {
        return DEFAULT_PERC_STR;
    }

    message(): ReactNode {
        return this.messageElement == null ? null : <p>{this.messageElement}</p>;
    }

    isValid(): boolean {
        return false;
    }
}

export class AlreadyFinalResult extends InvalidPercentageResult {
    readonly totalAchieved: number;

    constructor(totalAchieved: number) {
        super(null);
        this.totalAchieved = totalAchieved;
    }

    message(): ReactNode {
        return <p>Congratulations, you have already completed 100% of the course and achieved:</p>;
    }

    percentageStr(): string {
        return this.nToPercStr(this.totalAchieved);
    }
}

class CantReachPercentageResult extends ValidPercentageResult {
    readonly thresh: number;
    readonly theoreticalMaximum: number;

    constructor(requiredPercentage: number, requiredAchieved: number, thresh: number, theoreticalMaximum: number) {
        super(requiredPercentage, requiredAchieved);
        this.thresh = thresh;
        this.theoreticalMaximum = theoreticalMaximum;
    }

    message(): ReactNode {
        return <p>Unfortunately, you can't reach {this.nToPercStr(this.thresh)}%.<br/>The maximum percentage you can achieve
            is <b>{this.nToPercStr(this.theoreticalMaximum)}%</b>.</p>;
    }
}

export class OkPercentageResult extends ValidPercentageResult {
    readonly totalWeightLeft: number;

    constructor(requiredPercentage: number, requiredAchieved: number, totalWeightLeft: number) {
        super(requiredPercentage, requiredAchieved);
        this.totalWeightLeft = totalWeightLeft;
    }

    message(): ReactNode {
        return <p>Over the remaining <b>{this.nToPercStr(this.totalWeightLeft)}%</b>, you need at least:</p>
    }

}

class AlreadyReachedResult extends InvalidPercentageResult {
    readonly totalAchieved: number;

    constructor(totalAchieved: number) {
        super(null);
        this.totalAchieved = totalAchieved;
    }

    message(): ReactNode {
        return <p>Congratulations, you have already reached <b>{this.nToPercStr(this.totalAchieved)}%</b>!</p>;
    }
}

