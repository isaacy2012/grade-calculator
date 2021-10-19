import {Score} from "./Score";

export class Assignment {
    name: string | undefined;
    score: Score | undefined;
    weight: number | undefined;

    constructor(name: string | undefined, score: Score | undefined, weight: number | undefined) {
        this.name = name;
        this.score = score;
        this.weight = weight;
    }

    static fromStrings(nameStr: string, scoreStr: string, weightStr: string): Assignment | undefined {
        let score = Score.fromString(scoreStr)
        if (score) {
            return new Assignment(nameStr, score, parseFloat(weightStr));
        }
        return undefined;
    }

    static ofEmpty(): Assignment {
        return new Assignment(undefined, undefined, undefined);
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

