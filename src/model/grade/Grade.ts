
export class Grade {
    readonly str: string;
    readonly minimumBoundary: number;


    constructor(str: string, minimumBoundary: number) {
        this.str = str;
        this.minimumBoundary = minimumBoundary;
    }
}

export abstract class GradeResolver {
    readonly name: string;
    readonly caseSensitive: boolean;
    readonly grades: Grade[]

    protected constructor(name: string, caseSensitive: boolean, grades: Grade[]) {
        this.name = name;
        this.caseSensitive = caseSensitive;
        this.grades = grades;
    }

    numToGradeStr(num: number): string {
        for (let grade of this.grades) {
            if (num >= grade.minimumBoundary) {
                return grade.str;
            }
        }
        throw Error()
    }

    gradeStrToNum(str: string): number {
        for (let grade of this.grades) {
            if (this.caseSensitive ? str === grade.str : str.toUpperCase() === grade.str.toUpperCase()) {
                return grade.minimumBoundary;
            }
        }
        return NaN;
    }

}

