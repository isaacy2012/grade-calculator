import {Grade, GradeResolver} from "../Grade";
import {bd} from "../../Result";

export class AutGrades extends GradeResolver {
    static INSTANCE = new AutGrades();

    private constructor() {
        super(
            "AUT",
            "Auckland University of Technology",
            ["aut"],
            false,
            [
                new Grade("A+", bd("0.895")),
                new Grade("A", bd("0.845")),
                new Grade("A-", bd("0.745")),
                new Grade("B+", bd("0.745")),
                new Grade("B", bd("0.695")),
                new Grade("B-", bd("0.645")),
                new Grade("C+", bd("0.595")),
                new Grade("C", bd("0.545")),
                new Grade("C-", bd("0.495")),
                new Grade("D", bd("0.0")),
            ]
        );
    }

}

