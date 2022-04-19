import {Grade, GradeResolver} from "../Grade";

export class UoaGrades extends GradeResolver {
    static INSTANCE = new UoaGrades();

    constructor() {
        super(
            "University of Auckland",
            false,
            [
            new Grade("A+", 0.9),
            new Grade("A", 0.85),
            new Grade("A-", 0.8),
            new Grade("B+", 0.75),
            new Grade("B", 0.70),
            new Grade("B-", 0.65),
            new Grade("C+", 0.60),
            new Grade("C", 0.55),
            new Grade("C-", 0.50),
            new Grade("D+", 0.45),
            new Grade("D", 0.40),
            new Grade("D-", 0.0)
        ]);
    }

}
