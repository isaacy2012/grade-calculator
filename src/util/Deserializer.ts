import {Assignment, numToStr, StubAssignment, ValidAssignment} from "../model/Assignment";
import {Score} from "../model/Score";
import {v4 as uuidv4} from "uuid";


export function parseJSON(json: string): {title: string, assignments: Assignment[]} | null {
    let document = JSON.parse(json);
    let assignments: Assignment[] = [];
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
                let score: Score | null = Score.fromString(thing.scoreStr);
                if (!score) {
                    return new StubAssignment(uuidv4(), thing.name, thing.scoreStr, numToStr(thing.weight));
                }
                return new ValidAssignment(uuidv4(), thing.name, score, thing.weight);
            } else { // template
                return new StubAssignment(uuidv4(), thing.name, "", numToStr(thing.weight));
            }
        case "StubAssignment":
            return new StubAssignment(uuidv4(), thing.nameStr, thing.scoreStr ? thing.scoreStr : "", thing.weightStr);
        default:
            return null;
    }
}

