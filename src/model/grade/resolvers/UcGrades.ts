import {Grade, GradeResolver} from "../Grade";


export class UcGrades extends GradeResolver {
    static INSTANCE = new UcGrades();

    private constructor() {
        super(
            "University of Canterbury",
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
                new Grade("D", 0.4),
                new Grade("E", 0.0),
            ]
        );
    }

}

