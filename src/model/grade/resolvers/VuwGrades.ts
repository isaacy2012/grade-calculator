import {Grade, GradeResolver} from "../Grade";
import {bd} from "../../Result";

export class VuwGrades extends GradeResolver {
    static INSTANCE = new VuwGrades();

    private constructor() {
        super(
            "VUW",
            "Victoria University of Wellington",
            ["vic", "vuw"],
            false,
            [
                new Grade("A+", bd("0.9")),
                new Grade("A", bd("0.85")),
                new Grade("A-", bd("0.8")),
                new Grade("B+", bd("0.75")),
                new Grade("B", bd("0.70")),
                new Grade("B-", bd("0.65")),
                new Grade("C+", bd("0.60")),
                new Grade("C", bd("0.55")),
                new Grade("C-", bd("0.50")),
                new Grade("D", bd("0.4")),
                new Grade("E", bd("0.0")),
            ]
        );
    }

}

