import React, {ReactNode} from "react";
import {Assignment, ValidAssignment} from "./Assignment";
import bigDecimal from "js-big-decimal";


export const DIGITS = 2;
export const PRECISION = 10;
export const HMM = "Hmm... that doesn't seem right –";

export function ceil2dp(num: number): string {
    const base = 10 ** DIGITS;
    return (Math.ceil(num * base) / base).toFixed(DIGITS);
}

export function nToPercStr (num: number): string {
    const base = 10 ** DIGITS;
    return (Math.ceil(100 * num * base) / base).toFixed(DIGITS);
}

export function bdToPercStr(bdec: bigDecimal): string {
    return formatBd(bdec.multiply(bd("10")));
}

export function formatBd(bdec: bigDecimal): string {
    return bdec.round(DIGITS).getValue();
}


export interface Result {
    message(): ReactNode
}

export function bd(str: string): bigDecimal {
    return new bigDecimal(str)
}

const ZERO = bd("0")

export function create(
    assignments: Assignment[],
    threshNum: bigDecimal,
    outOf: bigDecimal,
    alreadyFinalResultFactory: (totalAchieved: bigDecimal) => Result,
    invalidInputResultFactory: () => Result,
    alreadyReachedResultFactory: (totalAchieved: bigDecimal) => Result,
    cantReachResultFactory: (requiredPercentage: bigDecimal, requiredAchieved: bigDecimal, theoreticalMaximum: bigDecimal) => Result,
    okResultFactory: (requiredPercentage: bigDecimal, requiredAchieved: bigDecimal, totalWeightLeft: bigDecimal) => Result
): Result {
    if (!assignments.every(it => it instanceof ValidAssignment)) {
        return new InvalidMessageResult(<span>You haven't filled in all the assignments.</span>);
    } else {
        let totalWeight = assignments.map((it: Assignment) => (bd((it as ValidAssignment).weightStr!)))
            .reduce((prev: bigDecimal, it: bigDecimal) => prev.add(it), bd("0"));
        let totalAchieved = assignments.reduce((prev: bigDecimal, it: Assignment) =>
            prev.add((it as ValidAssignment).score.calc().multiply(bd((it as ValidAssignment).weightStr))), bd("0")
        );
        let totalWeightLeft = bd("1").subtract(totalWeight);
        if (totalWeightLeft.compareTo(ZERO) < 0) {
            let percentage = formatBd((bd("100").subtract(totalWeightLeft.multiply(bd("100")))));
            return new InvalidMessageResult(
                <span>{HMM} it looks like you've already completed <b>{percentage}%</b> of the course.</span>
            );
        } else if (totalWeightLeft.compareTo(ZERO) === 0) {
            return alreadyFinalResultFactory(totalAchieved)
        }
        let theoreticalMaximum = totalAchieved.add(totalWeightLeft);
        let requiredAmount = threshNum.subtract(totalAchieved);
        let requiredPercentage = requiredAmount.divide(totalWeightLeft, 10);
        let requiredAchieved = requiredPercentage.multiply(outOf);
        if (requiredPercentage.compareTo(ZERO) < 0) {
            return alreadyReachedResultFactory(totalAchieved)
        } else if (requiredPercentage.compareTo(ZERO) > 0) {
            return cantReachResultFactory(requiredPercentage, requiredAchieved, theoreticalMaximum)
        } else {
            return okResultFactory(requiredPercentage, requiredAchieved, totalWeightLeft)
        }
    }
}

export class InvalidMessageResult implements Result {
    readonly messageElement: ReactNode;

    constructor(messageStr: React.ReactNode) {
        this.messageElement = messageStr;
    }

    message(): ReactNode {
        return this.messageElement == null ? null : <p>{this.messageElement}</p>;
    }
}


export class OkResult implements Result {
    readonly requiredPercentage: bigDecimal;
    readonly requiredAchieved: bigDecimal;
    readonly totalWeightLeft: bigDecimal;

    constructor(requiredPercentage: bigDecimal, requiredAchieved: bigDecimal, totalWeightLeft: bigDecimal) {
        this.totalWeightLeft = totalWeightLeft;
        this.requiredPercentage = requiredPercentage;
        this.requiredAchieved = requiredAchieved;
    }

    requiredPercentageStr(): string {
        return bdToPercStr(this.requiredPercentage);
    }

    requiredAchievedStr(): string {
        return formatBd(this.requiredAchieved);
    }

    message(): ReactNode {
        return <p>Over the remaining <b>{bdToPercStr(this.totalWeightLeft)}%</b>, you need at least:</p>
    }

}

