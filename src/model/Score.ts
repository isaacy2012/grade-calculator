import {fractionRegex, percentageRegex} from "./Regex";

export abstract class Score {
    readonly str: string;

    constructor(str: string) {
        this.str = str;
    }

    static fromString(str: string): Score | null {
        if (fractionRegex.test(str)) {
            return FractionScore.fromString(str);
        } else if (percentageRegex.test(str)) {
            return PercentageScore.fromString(str);
        }
        return null;
    }

    abstract toJSON(): any

    abstract calc(): number

    abstract toString(): string

    toInputString(): string {
        return this.str;
    }

    equals(other: Score | null): boolean {
        return this.str === other?.str;
    }

}

class FractionScore extends Score {
    readonly achieved: number;
    readonly outOf: number;


    constructor(str: string, achieved: number, outOf: number) {
        super(str);
        this.achieved = achieved;
        this.outOf = outOf;
    }

    static fromString(str: string): FractionScore | null {
        let splits: string[] = str.split("/");
        if (splits.length !== 2) {
            throw new Error("Invalid FractionScore string");
        }
        let achieved = parseFloat(splits[0]);
        let outOf = parseFloat(splits[1]);
        let ret = new FractionScore(str, achieved, outOf);
        if (ret.calc() > 1) {
            return null;
        }
        return ret;
    }

    calc(): number {
        return this.achieved / this.outOf;
    }

    equals(other: Score | null): boolean {
        if (other instanceof FractionScore) {
            return super.equals(other)
                && this.achieved === other.achieved
                && this.outOf === other.outOf;
        }
        return false;
    }

    toJSON(): any {
        return {
            clazz: "FractionScore",
            str: this.str,
            achieved: this.achieved,
            outOf: this.outOf
        };
    }

    toInputString(): string {
        return this.str;
    }

    toString(): string {
        return this.achieved + "/" + this.outOf;
    }
}

class PercentageScore extends Score {
    readonly percentage: number;

    constructor(str: string, percentage: number) {
        super(str);
        this.percentage = percentage;
    }

    static fromString(str: string): PercentageScore | null {
        let ret = new PercentageScore(str, parseFloat(str));
        if (ret.calc() > 1) {
            return null;
        }
        return ret;
    }

    calc(): number {
        return this.percentage;
    }

    equals(other: Score | null): boolean {
        if (other instanceof PercentageScore) {
            return super.equals(other)
                && this.percentage === other.percentage;
        }
        return false;
    }

    toJSON(): any {
        return {
            clazz: "PercentageScore",
            str: this.str,
            percentage: this.percentage,
        };
    }

    toString(): string {
        return (this.percentage * 100).toString();
    }
}
