import {VuwGrades} from "./resolvers/VuwGrades";
import {UoaGrades} from "./resolvers/UoaGrades";
import {GradeResolver} from "./Grade";
import {UcGrades} from "./resolvers/UcGrades";
import {OtagoGrades} from "./resolvers/OtagoGrades";

interface LabelToGrade {
    label: string,
    value: GradeResolver
}

export const GRADE_RESOLVERS: LabelToGrade[] = [
    {label: "Victoria University of Wellington", value: new VuwGrades()},
    {label: "University of Canterbury", value: new UcGrades()},
    {label: "University of Otago", value: new OtagoGrades()},
    {label: "Massey University", value: new OtagoGrades()},
    {label: "University of Auckland", value: new UoaGrades()},
].sort((a, b) => a.label.localeCompare(b.label))

