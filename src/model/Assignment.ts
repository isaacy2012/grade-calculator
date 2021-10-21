import {Score} from "./Score";
import {v4 as uuidv4} from "uuid";
import {percentageRegex} from "./Regex";


export function parseNumOrPerc(str: string): number {
    if (percentageRegex.test(str)) {
        return parseFloat(str.substr(0, str.length-1))/100;
    } else {
        return parseFloat(str);
    }
}

export class Assignment {
    valid: boolean
    readonly name: string | null;
    readonly score: Score | null;
    readonly weight: number | null;
    readonly uuid: string;

    constructor(valid: boolean, name: string | null, score: Score | null, weight: number | null, uuid: string) {
        this.valid = valid;
        this.name = name;
        this.score = score;
        this.weight = weight;
        this.uuid = uuid;
    }

    static fromStrings(nameStr: string, scoreStr: string, weightStr: string, uuid: string): Assignment | null {
        let score = Score.fromString(scoreStr)
        let weight = parseNumOrPerc(weightStr);
        if (nameStr.trim().length !== 0 && score && weightStr.trim().length !== 0) {
            return new Assignment(true, nameStr, score, weight, uuid);
        }
        return null;
    }

    static ofEmpty(): Assignment {
        return new Assignment(false, null, null, null, uuidv4());
    }

    accepted(): boolean {
        return this.name !== null
            && this.score !== null
            && this.weight !== null;

    }

    equals(other: Assignment): boolean {
        return this.name === other.name
            && this.score?.equals(other.score) === true
            && this.weight === other.weight;
    }

    toString(): string {
        return "name: " + this.name + ", score: " + this.score + ", weight: " + this.weight;
    }

    fullJSON(): any {
        return {
            clazz: "Assignment",
            valid: this.valid,
            name: this.name,
            scoreStr: this.score?.str,
            weight: this.weight,
        };
    }

    templateJSON(): any {
        return {
            clazz: "Assignment",
            valid: this.valid,
            name: this.name,
            weight: this.weight,
        };
    }

}

