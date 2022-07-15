import {fractionRegex, numberRegex, percentageRegex} from "./Regex";
import bigDecimal from "js-big-decimal";
import {bd, formatBd, ONE_HUNDRED, PRECISION} from "./Result";

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
        let achieved = bd(splits[0]);
        let outOf = bd(splits[1]);
        return new FractionScore(str, achieved, outOf);
    }

    calc(): bigDecimal {
        return this.achieved.divide(this.outOf, PRECISION);
    }

    equals(other: Score | null): boolean {
        if (other instanceof FractionScore) {
            return super.equals(other)
                && this.achieved.compareTo(other.achieved) === 0
                && this.outOf.compareTo(other.outOf) === 0;
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
            return new PercentageScore(str, bd(str).divide(ONE_HUNDRED, PRECISION));
        } else if (percentageRegex.test(str)) {
            return new PercentageScore(str, bd(str.substr(0, str.length - 1)).divide(ONE_HUNDRED, PRECISION));
        }
        return null;
    }

    calc(): bigDecimal {
        return this.percentage;
    }

    equals(other: Score | null): boolean {
        if (other instanceof PercentageScore) {
            return super.equals(other)
                && this.percentage.compareTo(other.percentage) === 0;
        }
        return false;
    }

    toString(): string {
        return formatBd(this.percentage)
    }
}
