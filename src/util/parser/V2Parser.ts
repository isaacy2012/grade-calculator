import { Assignment} from "../../model/Assignment";
import { JsonFieldV2Resolver, JsonOptCompressed, JsonOptStr } from "../JsonFields";
import { decompressFromBase64 } from "@amoutonbrady/lz-string";
import { v4 as uuidv4 } from "uuid";
import { orEmptyStr, orNull } from "../Serializer";
import { Parser } from "./Parser";

export class V2Parser implements Parser {
    private static _INSTANCE: V2Parser;
    public static getInstance(): V2Parser {
        if (this._INSTANCE == null) {
            this._INSTANCE = new V2Parser();
        }
        return this._INSTANCE;
    }

    jfr = new JsonFieldV2Resolver();

    parseCompressedJSON(json: string): {title: string, gradeResolverId: string | null, assignments: Assignment[]} | null {
        let decompressedNoBraces = decompressFromBase64(json);
        if (decompressedNoBraces == null) return null;

        const decompressed = `[${decompressedNoBraces}]`;
        let document
        try {
            document = expandNoFields(JSON.parse(decompressed));
        } catch (e) {
            return null;
        }
        let gradeResolverId = null;

        const gradeResolverIdField = this.jfr.keyFor("GradeResolverId");
        if (document.hasOwnProperty(gradeResolverIdField)) {
            gradeResolverId = orNull(document[gradeResolverIdField]);
        }
        let title: string = orEmptyStr(document[this.jfr.keyFor("Title")]);

        const assignmentsField = this.jfr.keyFor("Assignments");
        if (!document.hasOwnProperty(assignmentsField)) {
            return {
                title: title,
                gradeResolverId: gradeResolverId,
                assignments: []
            };
        }

        const assignmentData = []
        const size = 3;
        for (let i = assignmentsField; i < document.length; i += size) {
            assignmentData.push(document.slice(i, i + size));
        }

        const assignments = assignmentData.map((it: any) => this.parseAssignment(it))
            .filter(it => it != null) as Exclude<ReturnType<V2Parser["parseAssignment"]>, null>[];

        return {
            title: title,
            gradeResolverId: gradeResolverId,
            assignments: assignments
        };
    }

    private parseAssignment(thing: any): Assignment {
        const nameStr = orEmptyStr(thing[this.jfr.keyFor("NameStr")]);
        const scoreStr = orEmptyStr(thing[this.jfr.keyFor("ScoreStr")]);
        const weightStr = orEmptyStr(thing[this.jfr.keyFor("WeightStr")]);
        const uuid = uuidv4();
        return Assignment.fromStrings(nameStr, scoreStr, weightStr, uuid)
    }
}

export function expandNoFields(arr: JsonOptCompressed[]): JsonOptStr[] {
    const ret = [];
    for (const item of arr) {
        if (typeof item == "number" && item > 0) {
            for (let i = 0; i < item; i++) {
                ret.push(0);
            }
        } else {
            ret.push(item);
        }
    }

    return ret;
}
