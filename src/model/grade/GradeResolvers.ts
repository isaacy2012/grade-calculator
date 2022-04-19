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

export const GRADE_RESOLVERS_MAP: Map<string, LabelToGradeResolver> = new Map<string, LabelToGradeResolver>([
    [VuwGrades.INSTANCE.id, {label: VuwGrades.INSTANCE.name, value: VuwGrades.INSTANCE}],
    [UcGrades.INSTANCE.id, {label: UcGrades.INSTANCE.name, value: UcGrades.INSTANCE}],
    [OtagoGrades.INSTANCE.id, {label: OtagoGrades.INSTANCE.name, value: OtagoGrades.INSTANCE}],
    [MasseyGrades.INSTANCE.id, {label: MasseyGrades.INSTANCE.name, value: MasseyGrades.INSTANCE}],
    [WaikatoGrades.INSTANCE.id, {label: WaikatoGrades.INSTANCE.name, value: WaikatoGrades.INSTANCE}],
    [UoaGrades.INSTANCE.id, {label: UoaGrades.INSTANCE.name, value: UoaGrades.INSTANCE}],
    [AutGrades.INSTANCE.id, {label: AutGrades.INSTANCE.name, value: AutGrades.INSTANCE}],
])

export const GRADE_RESOLVERS: LabelToGradeResolver[] = Array.from(GRADE_RESOLVERS_MAP.values())
    .sort((a, b) => a.label.localeCompare(b.label))

