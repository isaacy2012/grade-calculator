import {fractionRegex, numberRegex, percentageRegex} from "./Regex";
import bigDecimal from "js-big-decimal";
import {formatBd} from "./Result";

export abstract class Score {
    readonly str: string;

    protected constructor(str: string) {
        this.str = str;
    }

    static fromString(str: string): Score | null {
        if (fractionRegex.test(str)) {
            return FractionScore.fromString(str);
        } else {
            return PercentageScore.fromString(str);
        }
    }

    abstract calc(): bigDecimal

    abstract toString(): string

    toInputString(): string {
        return this.str;
    }

    equals(other: Score | null): boolean {
        return this.str === other?.str;
    }

}

class FractionScore extends Score {
    readonly achieved: bigDecimal;
    readonly outOf: bigDecimal;


    constructor(str: string, achieved: bigDecimal, outOf: bigDecimal) {
        super(str);
        this.achieved = achieved;
        this.outOf = outOf;
    }

    static fromString(str: string): FractionScore | null {
        let splits: string[] = str.split("/");
        if (splits.length !== 2) {
            throw new Error("Invalid FractionScore string");
        }
        let achieved = new bigDecimal(splits[0]);
        let outOf = new bigDecimal(splits[1]);
        return new FractionScore(str, achieved, outOf);
    }

    calc(): bigDecimal {
        return this.achieved.divide(this.outOf, 10);
    }

    equals(other: Score | null): boolean {
        if (other instanceof FractionScore) {
            return super.equals(other)
                && this.achieved === other.achieved
                && this.outOf === other.outOf;
        }
        return false;
    }

    toInputString(): string {
        return this.str;
    }

    toString(): string {
        return this.achieved + "/" + this.outOf;
    }
}

class PercentageScore extends Score {
    readonly percentage: bigDecimal;

    constructor(str: string, percentage: bigDecimal) {
        super(str);
        this.percentage = percentage;
    }

    static fromString(str: string): PercentageScore | null {
        if (numberRegex.test(str)) {
            return new PercentageScore(str, new bigDecimal(str).divide(new bigDecimal("100"), 10));
        } else if (percentageRegex.test(str)) {
            return new PercentageScore(str, new bigDecimal(str.substr(0, str.length - 1)).divide(new bigDecimal("100"), 10));
        }
        return null;
    }

    calc(): bigDecimal {
        return this.percentage;
    }

    equals(other: Score | null): boolean {
        if (other instanceof PercentageScore) {
            return super.equals(other)
                && this.percentage === other.percentage;
        }
        return false;
    }

    toString(): string {
        return formatBd(this.percentage)
    }
}
