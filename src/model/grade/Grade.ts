import bigDecimal from "js-big-decimal";

export class Grade {
    readonly str: string;
    readonly minimumBoundary: bigDecimal;


    constructor(str: string, minimumBoundary: bigDecimal) {
        this.str = str;
        this.minimumBoundary = minimumBoundary;
    }
}

export abstract class GradeResolver {
    readonly id: string;
    readonly name: string;
    readonly nicknames: string[]
    readonly caseSensitive: boolean;
    readonly grades: Grade[]

    protected constructor(id: string, name: string, nicknames: string[], caseSensitive: boolean, grades: Grade[]) {
        this.id = id;
        this.name = name;
        this.nicknames = nicknames;
        this.caseSensitive = caseSensitive;
        this.grades = grades;
    }

    numToGradeStr(num: bigDecimal): string {
        for (let grade of this.grades) {
            let compare = num.compareTo(grade.minimumBoundary);
            if (compare > 0 || compare === 0) {
                return grade.str;
            }
        }
        throw Error()
    }

    gradeStrToNum(str: string): bigDecimal | null {
        for (let grade of this.grades) {
            if (this.caseSensitive ? str === grade.str : str.toUpperCase() === grade.str.toUpperCase()) {
                return grade.minimumBoundary;
            }
        }
        return null;
    }

}

