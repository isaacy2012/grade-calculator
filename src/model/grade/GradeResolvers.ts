import {VuwGrades} from "./resolvers/VuwGrades";
import {UoaGrades} from "./resolvers/UoaGrades";
import {GradeResolver} from "./Grade";
import {UcGrades} from "./resolvers/UcGrades";
import {OtagoGrades} from "./resolvers/OtagoGrades";
import {WaikatoGrades} from "./resolvers/WaikatoGrades";
import {MasseyGrades} from "./resolvers/MasseyGrades";
import {AutGrades} from "./resolvers/AutGrades";

export interface LabelToGradeResolver {
    label: string,
    value: GradeResolver
}

export const GRADE_RESOLVERS: LabelToGradeResolver[] = [
    {label: VuwGrades.INSTANCE.name, value: VuwGrades.INSTANCE},
    {label: UcGrades.INSTANCE.name, value: UcGrades.INSTANCE},
    {label: OtagoGrades.INSTANCE.name, value: OtagoGrades.INSTANCE},
    {label: MasseyGrades.INSTANCE.name, value: MasseyGrades.INSTANCE},
    {label: WaikatoGrades.INSTANCE.name, value: WaikatoGrades.INSTANCE},
    {label: UoaGrades.INSTANCE.name, value: UoaGrades.INSTANCE},
    {label: AutGrades.INSTANCE.name, value: AutGrades.INSTANCE},
].sort((a, b) => a.label.localeCompare(b.label))

