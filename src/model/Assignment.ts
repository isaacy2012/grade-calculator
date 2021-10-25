import {Score} from "./Score";
import {v4 as uuidv4} from "uuid";
import {percentageRegex} from "./Regex";


export function numOrPercToStr(str: string): number {
    if (percentageRegex.test(str)) {
        return parseFloat(str.substr(0, str.length - 1)) / 100;
    } else {
        return parseFloat(str) / 100;
    }
}

export function numToStr(num: number): string {
    return (num*100).toString();
}

export abstract class Assignment {
    readonly uuid: string;

    abstract getNameStr(): string;

    abstract getScoreStr(): string;

    abstract getWeightStr(): string;


    constructor(uuid: string) {
        this.uuid = uuid;
    }

    abstract clone(): Assignment

    abstract equals(other: Assignment): boolean;

    static fromStrings(nameStr: string, scoreStr: string, weightStr: string, uuid: string): Assignment {
        let score = Score.fromString(scoreStr)
        let weight = numOrPercToStr(weightStr);
        if (nameStr.trim().length !== 0 && score && weightStr.trim().length !== 0) {
            return new ValidAssignment(uuid, nameStr, score, weight);
        }
        return new StubAssignment(uuid, nameStr, scoreStr, weightStr);
    }

    static ofAdd(): Assignment {
        return new AddButtonAssignment(uuidv4());
    }

}

export abstract class SerializableAssignment extends Assignment {
    abstract fullJSON(): any

    abstract templateJSON(): any
}

export class ValidAssignment extends SerializableAssignment {
    readonly name: string;
    readonly score: Score;
    readonly weight: number;

    getNameStr(): string {
        return this.name;
    }

    getScoreStr(): string {
        return this.score.toInputString();
    }

    getWeightStr(): string {
        return (this.weight*100).toString();
    }

    constructor(uuid: string, name: string, score: Score, weight: number) {
        super(uuid);
        this.name = name;
        this.score = score;
        this.weight = weight;
    }

    equals(other: Assignment): boolean {
        if (other instanceof ValidAssignment) {
            return this.name === other.name
                && this.score.equals(other.score)
                && this.weight === other.weight;
        }
        return false;
    }

    clone(): Assignment {
        return new ValidAssignment(uuidv4(), this.name, this.score, this.weight);
    }

    toString(): string {
        return "name: " + this.name + ", score: " + this.score + ", weight: " + this.weight;
    }

    fullJSON(): any {
        return {
            clazz: "ValidAssignment",
            name: this.name,
            scoreStr: this.score.str,
            weight: this.weight,
        };
    }

    templateJSON(): any {
        return {
            clazz: "ValidAssignment",
            name: this.name,
            weight: this.weight,
        };
    }


}

export class StubAssignment extends SerializableAssignment {
    readonly nameStr: string;
    readonly scoreStr: string;
    readonly weightStr: string;

    getNameStr(): string {
        return this.nameStr;
    }

    getScoreStr(): string {
        return this.scoreStr;
    }

    getWeightStr(): string {
        return this.weightStr;
    }

    constructor(uuid: string, nameStr: string, scoreStr: string, weightStr: string) {
        super(uuid);
        this.nameStr = nameStr;
        this.scoreStr = scoreStr;
        this.weightStr = weightStr;
    }


    clone(): Assignment {
        return new StubAssignment(uuidv4(), this.nameStr, this.scoreStr, this.weightStr);
    }

    equals(other: Assignment): boolean {
        if (other instanceof StubAssignment) {
            return this.nameStr === other.nameStr
                && this.scoreStr === other.scoreStr
                && this.weightStr === other.weightStr;
        }
        return false;
    }

    fullJSON(): any {
        return {
            clazz: "StubAssignment",
            nameStr: this.nameStr,
            scoreStr: this.scoreStr,
            weightStr: this.weightStr,
        };
    }

    templateJSON(): any {
        return {
            clazz: "StubAssignment",
            nameStr: this.nameStr,
            weightStr: this.weightStr,
        };
    }
}

export class AddButtonAssignment extends Assignment {

    getNameStr(): string {
        return "";
    }

    getScoreStr(): string {
        return "";
    }

    getWeightStr(): string {
        return "";
    }

    equals(other: Assignment): boolean {
        return other instanceof AddButtonAssignment;
    }


    clone(): Assignment {
        return new AddButtonAssignment(uuidv4());
    }
}

