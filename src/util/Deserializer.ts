import {Assignment, numOrPercToBd, StubAssignment, ValidAssignment} from "../model/Assignment";
import {Score} from "../model/Score";
import {v4 as uuidv4} from "uuid";
import {compressToBase64, decompressFromBase64} from "@amoutonbrady/lz-string"

export function writeCompressedJSON(title: string, gradeResolverId: string | null, assignments: Assignment[]) {
    return compressToBase64(JSON.stringify(
        {
            title: title,
            gradeResolverId: gradeResolverId,
            assignments: assignments
        }
    ))
}

export function parseCompressedJSON(json: string): {title: string, gradeResolverId: string, assignments: Assignment[]} | null {
    let decompressed = decompressFromBase64(json);
    if (decompressed == null) {
        return null;
    }
    let document
    try {
        document = JSON.parse(decompressed);
    } catch (e) {
        return null;
    }
    let assignments: Assignment[] = [];
    let gradeResolverId = null;
    if (document.hasOwnProperty("gradeResolverId")) {
        gradeResolverId = document.gradeResolverId;
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
        gradeResolverId: gradeResolverId,
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
                let weight = numOrPercToBd(thing.weightStr);
                let score: Score | null = Score.fromString(thing.scoreStr);
                if (score && weight != null) {
                    return new ValidAssignment(uuidv4(), thing.name, score, thing.weightStr);
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

