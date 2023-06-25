import { Assignment } from "../../model/Assignment";
import { V2Parser } from "./V2Parser";

export interface Parser {
    parseCompressedJSON(json: string): {title: string, gradeResolverId: string | null, assignments: Assignment[]} | null
}

export function getLatestParser(): Parser {
    return V2Parser.getInstance();
}
