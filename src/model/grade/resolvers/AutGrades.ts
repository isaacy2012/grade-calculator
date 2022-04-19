import {Grade, GradeResolver} from "../Grade";

export class AutGrades extends GradeResolver {
    static INSTANCE = new AutGrades();

    private constructor() {
        super(
            "Auckland University of Technology",
            false,
            [
                new Grade("A+", 0.895),
                new Grade("A", 0.845),
                new Grade("A-", 0.745),
                new Grade("B+", 0.745),
                new Grade("B", 0.695),
                new Grade("B-", 0.645),
                new Grade("C+", 0.595),
                new Grade("C", 0.545),
                new Grade("C-", 0.495),
                new Grade("D", 0.0),
            ]
        );
    }

}

