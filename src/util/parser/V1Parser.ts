import { Assignment, numOrPercToBd, StubAssignment, ValidAssignment } from "../../model/Assignment";
import { JsonFieldV1Resolver } from "../JsonFields";
import { decompressFromBase64 } from "@amoutonbrady/lz-string";
import { Score } from "../../model/Score";
import { v4 as uuidv4 } from "uuid";
import { orEmptyStr } from "../Serializer";
import { Parser } from "./Parser";

export class V1Parser implements Parser {
    private static _INSTANCE: V1Parser;
    public static getInstance(): V1Parser {
        if (this._INSTANCE == null) {
            this._INSTANCE = new V1Parser();
        }
        return this._INSTANCE;
    }

    jfr = new JsonFieldV1Resolver();

    parseCompressedJSON(json: string): {title: string, gradeResolverId: string, assignments: Assignment[]} | null {

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

        const gradeResolverIdField = this.jfr.keyFor("GradeResolverId");
        if (document.hasOwnProperty(gradeResolverIdField)) {
            gradeResolverId = document[gradeResolverIdField];
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

        const assignments = (document[assignmentsField] as unknown[])
            .map((it: unknown) => this.parseAssignment(it))
            .filter(it => it != null) as Exclude<ReturnType<V1Parser["parseAssignment"]>, null>[];

        return {
            title: title,
            gradeResolverId: gradeResolverId,
            assignments: assignments
        };
    }

    private parseAssignment(thing: any): Assignment | null {
        const clazzField = this.jfr.keyFor("Clazz");

        const clazzName = thing[clazzField];

        switch (clazzName) {
            case this.jfr.clazzFor("ValidAssignment"):
                const name = orEmptyStr(thing[this.jfr.keyFor("Name")]);
                const weightStr = orEmptyStr(thing[this.jfr.keyFor("WeightStr")]);

                if (thing.hasOwnProperty("scoreStr")) {
                    const weight = numOrPercToBd(weightStr);
                    const scoreStr = orEmptyStr(thing[this.jfr.keyFor("ScoreStr")]);
                    const score: Score | null = Score.fromString(scoreStr);


                    if (score && weight != null) {
                        return new ValidAssignment(uuidv4(), orEmptyStr(name), score, weightStr);
                    }
                    return new StubAssignment(uuidv4(), name, scoreStr, weightStr);
                } else { // template
                    return new StubAssignment(uuidv4(), name, "", weightStr);
                }
            case this.jfr.clazzFor("StubAssignment"):
                return new StubAssignment(
                    uuidv4(),
                    thing[this.jfr.keyFor("NameStr")],
                    orEmptyStr(thing[this.jfr.keyFor("ScoreStr")]),
                    orEmptyStr(thing[this.jfr.keyFor("WeightStr")])
                );
            default:
                return null;
        }
    }
}

