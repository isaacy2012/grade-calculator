import {
    Assignment,
    numOrPercToBd,
    SerializableAssignment,
    StubAssignment,
    ValidAssignment
} from "../model/Assignment";
import {Score} from "../model/Score";
import {v4 as uuidv4} from "uuid";
import { compressToBase64, decompressFromBase64 } from "@amoutonbrady/lz-string"
import { JsonFieldResolver } from "./JsonFields";

type JsonValue = string | boolean | number | null | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = Record<string, JsonValue> | JsonObject[];

export function shallowPrune(obj: JsonObject): JsonObject {
    if (Array.isArray(obj)) return obj;

    const copy = { ...obj };
    for (const key in copy) {
        if (copy[key] === "" || copy[key] == null || copy[key] === []) {
            delete copy[key];
        }
    }
    return copy;
}

export function orEmptyStr(s: string | undefined) {
    if (s == null) return "";
    return s;
}

export function orDefault<T>(t: T | undefined, def: T) {
    if (t == null) return def;
    return t;
}

/**
 * Trim the end of a string of a given character
 * @param {string} str - The string to trim.
 * @param {string} ch - The character to trim from the end of the string.
 * @returns the string with the trailing characters removed.
 */
function trimEnd(str: string, ch: string): string {
    let end = str.length;
    while(end > 0 && str[end - 1] === ch)
        --end;

    return (end < str.length) ? str.substring(0, end) : str;
}


export function writeCompressedJSON(title: string, gradeResolverId: string | null, payload: JsonObject[], jsonFieldResolver: JsonFieldResolver) {
    let compressed = compressToBase64(JSON.stringify(
        shallowPrune({
            [jsonFieldResolver.keyFor("Title")]: title,
            [jsonFieldResolver.keyFor("GradeResolverId")]: gradeResolverId,
            [jsonFieldResolver.keyFor("Assignments")]: payload
        })
    ));
    console.log(JSON.stringify(
        shallowPrune({
            [jsonFieldResolver.keyFor("Title")]: title,
            [jsonFieldResolver.keyFor("GradeResolverId")]: gradeResolverId,
            [jsonFieldResolver.keyFor("Assignments")]: payload
        })
    ));
    // compressToBase64 adds some number of '=' at the end of the string, which is not stylish for URLs, so we remove it.
    // Decompression without the '=' works fine.
    if (compressed.endsWith("=")) {
        compressed = trimEnd(compressed, "=");
    }
    return compressed;
}

export function parseCompressedJSON(json: string, jsonFieldResolver: JsonFieldResolver): {title: string, gradeResolverId: string, assignments: Assignment[]} | null {
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
    let gradeResolverId = null;

    const gradeResolverIdField = jsonFieldResolver.keyFor("GradeResolverId");
    if (document.hasOwnProperty(gradeResolverIdField)) {
        gradeResolverId = document[gradeResolverIdField];
    }
    let title: string = orEmptyStr(document[jsonFieldResolver.keyFor("Title")]);

    const assignmentsField = jsonFieldResolver.keyFor("Assignments");
    if (!document.hasOwnProperty(assignmentsField)) {
        return {
            title: title,
            gradeResolverId: gradeResolverId,
            assignments: []
        };
    }

    const assignments = (document[assignmentsField] as unknown[])
        .map((it: unknown) => parseAssignment(it, jsonFieldResolver))
        .filter(it => it != null) as Exclude<ReturnType<typeof parseAssignment>, null>[];

    console.log("ASSIG: " + assignments)

    // let assignments: Assignment[] = [];
    // for (let thing of document[assignmentsField]) {
    //     let assignment = parseAssignment(thing, jsonFieldResolver);
    //     if (assignment) {
    //         assignments.push(assignment)
    //     } else {
    //         // return undefined;
    //     }
    // }

    return {
        title: title,
        gradeResolverId: gradeResolverId,
        assignments: assignments
    };
}

function parseAssignment(thing: any, jsonFieldResolver: JsonFieldResolver): Assignment | null {
    const clazzField = jsonFieldResolver.keyFor("Clazz");

    const clazzName = thing[clazzField];
    if (!jsonFieldResolver.isValidClazz(clazzName)) {
        return null;
    }

    switch (clazzName) {
        case jsonFieldResolver.clazzFor("ValidAssignment"):
            const name = orEmptyStr(thing[jsonFieldResolver.keyFor("Name")]);
            const weightStr = orEmptyStr(thing[jsonFieldResolver.keyFor("WeightStr")]);

            if (thing.hasOwnProperty("scoreStr")) {
                const weight = numOrPercToBd(weightStr);
                const scoreStr = orEmptyStr(thing[jsonFieldResolver.keyFor("ScoreStr")]);
                const score: Score | null = Score.fromString(scoreStr);


                if (score && weight != null) {
                    return new ValidAssignment(uuidv4(), orEmptyStr(name), score, weightStr);
                }
                return new StubAssignment(uuidv4(), name, scoreStr, weightStr);
            } else { // template
                return new StubAssignment(uuidv4(), name, "", weightStr);
            }
        case jsonFieldResolver.clazzFor("StubAssignment"):
            return new StubAssignment(
                uuidv4(),
                thing[jsonFieldResolver.keyFor("NameStr")],
                orEmptyStr(thing[jsonFieldResolver.keyFor("ScoreStr")]),
                orEmptyStr(thing[jsonFieldResolver.keyFor("WeightStr")])
            );
        default:
            return null;
    }
}

