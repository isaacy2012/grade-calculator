import {Assignment, numOrPercToStr, StubAssignment, ValidAssignment} from "../model/Assignment";
import {Score} from "../model/Score";
import {v4 as uuidv4} from "uuid";
import {compressToBase64, decompressFromBase64} from "@amoutonbrady/lz-string"

export function writeCompressedJSON(title: string, gradeResolverName: string | null, assignments: Assignment[]) {
    return compressToBase64(JSON.stringify(
        {
            title: title,
            gradeResolverName: gradeResolverName,
            assignments: assignments
        }
    ))
}

export function parseCompressedJSON(json: string): {title: string, gradeResolverName: string, assignments: Assignment[]} | null {
    let decompressed = decompressFromBase64(json);
    if (decompressed == null) {
        return null;
    }
    let document = JSON.parse(decompressed);
    let assignments: Assignment[] = [];
    let gradeResolverName = null;
    if (document.hasOwnProperty("gradeResolverName")) {
        gradeResolverName = document.gradeResolverName;
    }
    let title: string = document.title ? document.title : "";
    if (!document.hasOwnProperty("assignments")) {
        return null;
    }
    for (let thing of document.assignments) {
        let assignment = parseAssignment(thing);
        if (assignment) {
            assignments.push(assignment)
        } else {
            // return undefined;
        }
    }
    return {
        title: title,
        gradeResolverName: gradeResolverName,
        assignments: assignments
    };
}

function parseAssignment(thing: any): Assignment | null {
    if (!thing.clazz.endsWith("Assignment")) {
        return null;
    }

    switch (thing.clazz) {
        case "ValidAssignment":
            if (thing.hasOwnProperty("scoreStr")) {
                let weight = numOrPercToStr(thing.weightStr);
                let score: Score | null = Score.fromString(thing.scoreStr);
                if (score && !isNaN(weight)) {
                    return new ValidAssignment(uuidv4(), thing.name, score, weight, thing.weightStr);
                }
                return new StubAssignment(uuidv4(), thing.name, thing.scoreStr, thing.weightStr);
            } else { // template
                return new StubAssignment(uuidv4(), thing.name, "", thing.weightStr);
            }
        case "StubAssignment":
            return new StubAssignment(uuidv4(), thing.nameStr, thing.scoreStr ? thing.scoreStr : "", thing.weightStr);
        default:
            return null;
    }
}

