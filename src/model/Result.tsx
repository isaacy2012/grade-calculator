import React, {ReactNode} from "react";
import {Assignment, ValidAssignment} from "./Assignment";
import bigDecimal from "js-big-decimal";
import {DEFAULT_OUT_OF} from "../constant/Constants";
import {zeroRegex} from "./Regex";


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
    return formatBd(bdec.multiply(HUND));
}

export function formatBd(bdec: bigDecimal): string {
    // start off with two digits
    let digits = 2
    let formatted = formatBdWithPrecision(bdec, digits);
    // if it's all zeroes, and not accurate, keep adding precision until it's not all zeros or it's accurate
    while (zeroRegex.test(formatted) && bdec.compareTo(bdec.round(digits)) !== 0 && digits < 10) {
        digits = digits + 1;
        formatted = formatBdWithPrecision(bdec, digits);
    }
    // // add 1 more precision for 2sf
    // formatted = formatBdWithPrecision(bdec, digits + 1);
    // // remove the last character if it's a 0
    // // there must be a '.' in it since the digits start at 2
    // if (formatted.charAt(formatted.length - 1) === '0') {
    //     formatted = formatBdWithPrecision(bdec, digits);
    // }
    return formatted;
}

function formatBdWithPrecision(bdec: bigDecimal, precision: number): string {
    return bdec.round(precision).getValue();
}


export interface Result {
    message(): ReactNode
}

export function bd(str: string | number): bigDecimal {
    return new bigDecimal(str);
}

export const ZERO = bd("0");
export const ONE = bd("1");
export const HUND = bd("100");

export function create(
    assignments: Assignment[],
    threshNum: bigDecimal | null,
    outOf: bigDecimal | null,
    alreadyFinalResultFactory: (totalAchieved: bigDecimal) => Result,
    invalidInputResultFactory: () => Result,
    alreadyReachedResultFactory: (totalAchieved: bigDecimal) => Result,
    cantReachResultFactory: (requiredPercentage: bigDecimal, requiredAchieved: string, theoreticalMaximum: bigDecimal) => Result,
    okResultFactory: (requiredPercentage: bigDecimal, requiredAchieved: string, totalWeightLeft: bigDecimal) => Result
): Result {
    if (!assignments.every(it => it instanceof ValidAssignment)) {
        return new InvalidMessageResult(<span>You haven't filled in all the assignments.</span>);
    } else {
        if (threshNum == null) {
            return invalidInputResultFactory();
        }
        let totalWeight = assignments.map((it: Assignment) => ((it as ValidAssignment).getWeight()))
            .reduce((prev: bigDecimal, it: bigDecimal) => prev.add(it), bd("0"));
        let totalAchieved = assignments.reduce((prev: bigDecimal, it: Assignment) =>
            prev.add((it as ValidAssignment).score.calc().multiply((it as ValidAssignment).getWeight())), bd("0")
        );
        let totalWeightLeft = bd("1").subtract(totalWeight);
        if (totalWeightLeft.compareTo(ZERO) < 0) {
            let percentage = formatBd((HUND.subtract(totalWeightLeft.multiply(HUND))));
            return new InvalidMessageResult(
                <span>{HMM} it looks like you've already completed <b>{percentage}%</b> of the course.</span>
            );
        } else if (totalWeightLeft.compareTo(ZERO) === 0) {
            return alreadyFinalResultFactory(totalAchieved)
        }
        let theoreticalMaximum = totalAchieved.add(totalWeightLeft);
        let requiredAmount = threshNum.subtract(totalAchieved);
        let requiredPercentage = requiredAmount.divide(totalWeightLeft, 10);
        let requiredAchieved = outOf ? formatBd(requiredPercentage.multiply(outOf)) : DEFAULT_OUT_OF;
        if (requiredPercentage.compareTo(ZERO) <= 0) {
            return alreadyReachedResultFactory(totalAchieved)
        } else if (requiredPercentage.compareTo(ONE) > 0) {
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
    readonly requiredAchieved: string;
    readonly totalWeightLeft: bigDecimal;

    constructor(requiredPercentage: bigDecimal, requiredAchieved: string, totalWeightLeft: bigDecimal) {
        this.totalWeightLeft = totalWeightLeft;
        this.requiredPercentage = requiredPercentage;
        this.requiredAchieved = requiredAchieved;
    }

    requiredPercentageStr(): string {
        return bdToPercStr(this.requiredPercentage);
    }

    requiredAchievedStr(): string {
        return this.requiredAchieved
    }

    message(): ReactNode {
        return <p>Over the remaining <b>{bdToPercStr(this.totalWeightLeft)}%</b>, you need at least:</p>
    }

}

