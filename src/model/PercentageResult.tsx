import React, {ReactNode} from "react";
import {Assignment} from "./Assignment";
import {create, HMM, nToPercStr, OkResult, Result} from "./Result";

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


