import React, {ReactNode} from "react";
import {Assignment, ValidAssignment} from "./Assignment";

export const DIGITS = 2;
export const HMM = "Hmm... that doesn't seem right –";

function ceil2dp(num: number): string {
    const base = 10 ** DIGITS;
    return (Math.ceil(num * base) / base).toFixed(DIGITS);
}

export function nToPercStr (num: number): string {
    const base = 10 ** DIGITS;
    return (Math.ceil(100 * num * base) / base).toFixed(DIGITS);
}


export interface Result {
    message(): ReactNode
}

export function create(
    assignments: Assignment[],
    threshNum: number,
    outOf: number,
    alreadyFinalResultFactory: (totalAchieved: number) => Result,
    invalidInputResultFactory: () => Result,
    alreadyReachedResultFactory: (totalAchieved: number) => Result,
    cantReachResultFactory: (requiredPercentage: number, requiredAchieved: number, theoreticalMaximum: number) => Result,
    okResultFactory: (requiredPercentage: number, requiredAchieved: number, totalWeightLeft: number) => Result
): Result {
    if (!assignments.every(it => it instanceof ValidAssignment)) {
        return new InvalidMessageResult(<span>You haven't filled in all the assignments.</span>);
    } else {
        if (isNaN(threshNum)) {
            return invalidInputResultFactory()
        }
        let totalWeight = assignments.map((it: Assignment) => (it as ValidAssignment).weight!)
            .reduce((prev: number, it: number) => prev + it, 0);
        let totalAchieved = assignments.reduce((prev: number, it: Assignment) =>
            prev + (it as ValidAssignment).score.calc() * (it as ValidAssignment).weight, 0
        );
        let totalWeightLeft = 1 - totalWeight;
        if (totalWeightLeft < 0) {
            return new InvalidMessageResult(
                <span>{HMM} it looks like you've already completed <b>{(100-(totalWeightLeft * 100)).toFixed(DIGITS)}%</b> of the course.</span>);
        } else if (totalWeightLeft === 0) {
            return alreadyFinalResultFactory(totalAchieved)
        }
        let theoreticalMaximum = totalAchieved + totalWeightLeft;
        let requiredAmount = threshNum - totalAchieved;
        let requiredPercentage = requiredAmount / totalWeightLeft;
        let requiredAchieved = (requiredPercentage * outOf);
        if (requiredPercentage <= 0) {
            return alreadyReachedResultFactory(totalAchieved)
        } else if (requiredPercentage > 1) {
            return cantReachResultFactory(requiredPercentage, requiredAchieved, theoreticalMaximum)
        } else {
            return okResultFactory(requiredPercentage, requiredAchieved, totalWeightLeft)
        }
    }
}


export abstract class PercentageResult implements Result {
    abstract message(): ReactNode

    static create(assignments: Assignment[], threshStr: string, outOf: number): Result {
        return create(
            assignments,
            parseFloat(threshStr) * 100,
            outOf,
            (totalAchieved) => new AlreadyFinalPercentageResult(totalAchieved),
            () => new InvalidPercentageResult(
                threshStr === "" ? <span>Enter your desired percentage above.</span> :
                <span>{HMM} the threshold <b>{threshStr}</b> isn't valid.</span>
            ),
            (totalAchieved) => new AlreadyReachedPercentageResult(totalAchieved),
            (requiredPercentage, requiredAchieved, theoreticalMaximum) =>
                new CantReachPercentageResult(threshStr, theoreticalMaximum),
            (requiredPercentage, requiredAchieved, totalWeightLeft) =>
                new OkResult(requiredPercentage, requiredAchieved, totalWeightLeft)
        )
    }
}

export class OkResult implements Result {
    readonly requiredPercentage: number;
    readonly requiredAchieved: number;
    readonly totalWeightLeft: number;

    constructor(requiredPercentage: number, requiredAchieved: number, totalWeightLeft: number) {
        this.totalWeightLeft = totalWeightLeft;
        this.requiredPercentage = requiredPercentage;
        this.requiredAchieved = requiredAchieved;
    }

    requiredPercentageStr(): string {
        return nToPercStr(this.requiredPercentage);
    }

    requiredAchievedStr(): string {
        return ceil2dp(this.requiredAchieved);
    }

    message(): ReactNode {
        return <p>Over the remaining <b>{nToPercStr(this.totalWeightLeft)}%</b>, you need at least:</p>
    }

}

class InvalidMessageResult implements Result {
    readonly messageElement: ReactNode;

    constructor(messageStr: React.ReactNode) {
        this.messageElement = messageStr;
    }

    message(): ReactNode {
        return this.messageElement == null ? null : <p>{this.messageElement}</p>;
    }
}

class InvalidPercentageResult extends PercentageResult {
    readonly messageElement: ReactNode;

    constructor(messageStr: React.ReactNode) {
        super();
        this.messageElement = messageStr;
    }

    message(): ReactNode {
        return this.messageElement == null ? null : <p>{this.messageElement}</p>;
    }
}

export class AlreadyFinalPercentageResult extends InvalidPercentageResult {
    readonly totalAchieved: number;

    constructor(totalAchieved: number) {
        super(null);
        this.totalAchieved = totalAchieved;
    }

    message(): ReactNode {
        return <p>Congratulations, you have already completed the course and achieved:</p>;
    }

    percentageStr(): string {
        return nToPercStr(this.totalAchieved);
    }
}

class AlreadyReachedPercentageResult extends InvalidPercentageResult {
    readonly totalAchieved: number;

    constructor(totalAchieved: number) {
        super(null);
        this.totalAchieved = totalAchieved;
    }

    message(): ReactNode {
        return <p>Congratulations, you have already reached <b>{nToPercStr(this.totalAchieved)}%</b>!</p>;
    }
}

class CantReachPercentageResult extends InvalidPercentageResult {
    readonly threshStr: string;
    readonly theoreticalMaximum: number;

    constructor(threshStr: string, theoreticalMaximum: number) {
        super(null);
        this.threshStr = threshStr;
        this.theoreticalMaximum = theoreticalMaximum;
    }

    message(): ReactNode {
        return <p>Unfortunately, you can't reach {this.threshStr}%.<br/>The maximum percentage you can achieve
            is <b>{nToPercStr(this.theoreticalMaximum)}%</b>.</p>;
    }
}


