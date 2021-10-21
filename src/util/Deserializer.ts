import {Assignment} from "../model/Assignment";
import {Score} from "../model/Score";
import {v4 as uuidv4} from "uuid";


export function parseJSON(json: string): Assignment[] {
    let document = JSON.parse(json);
    let assignments: Assignment[] = [];
    for (let thing of document) {
        let assignment = parseAssignment(thing);
        if (assignment) {
            assignments.push(assignment)
        } else {
            // return undefined;
        }
    }
    return assignments;
}

function parseAssignment(thing: any): Assignment | null {
    if (thing.clazz !== "Assignment") {
        return null;
    }
    let score: Score | null = Score.fromString(thing.scoreStr);
    if (!score) {
        return new Assignment(thing.valid, thing.name, null, thing.weight, uuidv4());
    }
    return new Assignment(thing.valid, thing.name, score, thing.weight, uuidv4());
}

