import React, {ReactElement} from "react";
import {Assignment} from "../../model/Assignment";

const DIGITS = 2;
const DEFAULT_PERC_STR = "--";

export abstract class PercentageResult {
    abstract requiredPercentageStr(): string

    abstract requiredAchievedStr(): string

    abstract message(): ReactElement | void

    abstract isValid(): boolean

    nToPercStr(n: number): string {
        return (n * 100).toFixed(DIGITS);
    }

    static create(assignments: Assignment[], threshStr: string, outOf: number): PercentageResult {
        let threshNum = parseFloat(threshStr)
        if (!isNaN(threshNum) && assignments.every(it => it.accepted())) {
            let thresh = threshNum / 100;
            let totalWeight = assignments.map((it: Assignment) => it.weight!)
                .reduce((prev: number, it: number) => prev + it, 0);
            let totalAchieved = assignments.reduce((prev: number, it: Assignment) =>
                prev + it.score!.calc() * it.weight!, 0
            );
            let totalWeightLeft = 1 - totalWeight;
            if (totalWeightLeft < 0) {
                return new InvalidPercentageResult();
            }
            let theoreticalMaximum = totalAchieved + totalWeightLeft;
            let requiredAmount = thresh - totalAchieved;
            let requiredPercentage = requiredAmount / totalWeightLeft;
            let requiredAchieved = (requiredPercentage * outOf);
            if (requiredPercentage < 0) {
                return new AlreadyReachedResult(totalAchieved);
            } else if (requiredPercentage > 1) {
                return new CantReachPercentageResult(requiredPercentage, requiredAchieved, thresh, theoreticalMaximum);
            } else {
                return new OkPercentageResult(requiredPercentage, requiredAchieved, totalWeightLeft);
            }
        } else {
            return new InvalidPercentageResult();
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
    requiredPercentageStr(): string {
        return DEFAULT_PERC_STR;
    }

    requiredAchievedStr(): string {
        return DEFAULT_PERC_STR;
    }

    message(): ReactElement | void {
    }

    isValid(): boolean {
        return false;
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

    message(): ReactElement | void {
        return <p>Unfortunately, you can't reach {this.nToPercStr(this.thresh)}%. The maximum percentage you can achieve
            is <b>{this.nToPercStr(this.theoreticalMaximum)}%</b></p>;
    }
}

class OkPercentageResult extends ValidPercentageResult {
    readonly totalWeightLeft: number;

    constructor(requiredPercentage: number, requiredAchieved: number, totalWeightLeft: number) {
        super(requiredPercentage, requiredAchieved);
        this.totalWeightLeft = totalWeightLeft;
    }

    message(): React.ReactElement | void {
        return <p>Over the remaining <b>{this.nToPercStr(this.totalWeightLeft)}%</b>, you need:</p>
    }

}

class AlreadyReachedResult extends InvalidPercentageResult {
    readonly totalAchieved: number;

    constructor(totalAchieved: number) {
        super();
        this.totalAchieved = totalAchieved;
    }

    message(): ReactElement | void {
        return <p>Congratulations, you have already reached <b>{this.nToPercStr(this.totalAchieved)}%</b>!</p>;
    }
}

