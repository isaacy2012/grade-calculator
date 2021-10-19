export class Assignment {
    name: string;
    score: number;
    weight: number;

    constructor(name: string, score: number, weight: number) {
        this.name = name;
        this.score = score;
        this.weight = weight;
    }

    static ofStrings(nameStr: string, scoreStr: string, weightStr: string): Assignment {
        return new Assignment(nameStr, parseFloat(scoreStr), parseFloat(weightStr));
    }

    equals(other: Assignment): boolean {
        return this.name === other.name && this.score === other.score && this.weight === other.weight;
    }

    toString(): string {
        return "name: " + this.name + ", score: " + this.score + ", weight: " + this.weight;
    }
}
