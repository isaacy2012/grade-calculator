import { Assignment } from "../../model/Assignment";

export interface Parser {
    parseCompressedJSON(json: string): {title: string, gradeResolverId: string | null, assignments: Assignment[]} | null
}

