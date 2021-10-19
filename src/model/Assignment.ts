import {Score} from "./Score";

export class Assignment {
    valid: boolean
    readonly name: string | undefined;
    readonly score: Score | undefined;
    readonly weight: number | undefined;

    constructor(valid: boolean, name: string | undefined, score: Score | undefined, weight: number | undefined) {
        this.valid = valid;
        this.name = name;
        this.score = score;
        this.weight = weight;
    }

    static fromStrings(nameStr: string, scoreStr: string, weightStr: string): Assignment | undefined {
        let score = Score.fromString(scoreStr)
        if (nameStr.trim().length !== 0 && score && weightStr.trim().length !== 0) {
            return new Assignment(true, nameStr, score, parseFloat(weightStr));
        }
        return undefined;
    }

    static ofEmpty(): Assignment {
        return new Assignment(false, undefined, undefined, undefined);
    }

    accepted(): boolean {
        return this.name !== undefined
            && this.score !== undefined
            && this.weight !== undefined;

    }

    equals(other: Assignment): boolean {
        return this.name === other.name
            && this.score?.equals(other.score) === true
            && this.weight === other.weight;
    }

    toString(): string {
        return "name: " + this.name + ", score: " + this.score + ", weight: " + this.weight;
    }

}

