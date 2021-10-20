import {Score} from "./Score";
import {v4 as uuidv4} from "uuid";


export class Assignment {
    valid: boolean
    readonly name: string | undefined;
    readonly score: Score | undefined;
    readonly weight: number | undefined;
    readonly uuid: string;

    constructor(valid: boolean, name: string | undefined, score: Score | undefined, weight: number | undefined, uuid: string) {
        this.valid = valid;
        this.name = name;
        this.score = score;
        this.weight = weight;
        this.uuid = uuid;
    }

    static fromStrings(nameStr: string, scoreStr: string, weightStr: string, uuid: string): Assignment | undefined {
        let score = Score.fromString(scoreStr)
        if (nameStr.trim().length !== 0 && score && weightStr.trim().length !== 0) {
            return new Assignment(true, nameStr, score, parseFloat(weightStr), uuid);
        }
        return undefined;
    }

    static ofEmpty(): Assignment {
        return new Assignment(false, undefined, undefined, undefined, uuidv4());
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

    toJSON(): any {
        return {
            clazz: "Assignment",
            name: this.name,
            score: this.score,
            weight: this.weight,
            uuid: this.uuid,
        };
    }

}

