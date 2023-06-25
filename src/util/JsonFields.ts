import { getLatestParser, Parser } from "./parser/Parser";
import { V2Parser } from "./parser/V2Parser";
import { V1Parser } from "./parser/V1Parser";

export enum JsonIntCode {
    NoField = 0
}
export type JsonOptStr = string | JsonIntCode.NoField;
export type JsonOptCompressed = string | number;

type JsonField = "Title" | "GradeResolverId" | "Assignments" | "Clazz" | "NameStr" | "Name" | "WeightStr" | "ScoreStr" | "Clazzes"
type ClazzKey = "ValidAssignment" | "StubAssignment"

export interface JsonFieldResolver {
    keyFor(key: JsonField): string | number
}

enum JsonFieldV1Enum {
    Title = "title",
    GradeResolverId = "gradeResolverId",
    Assignments = "assignments",
    // Inside Assignment
    Clazz = "clazz",
    NameStr = "nameStr",
    Name = "name",
    WeightStr = "weightStr",
    ScoreStr = "scoreStr",
}

enum JsonFieldV2Enum {
    Title = 0,
    GradeResolverId = 1,
    Assignments = 2,
    // Inside Assignment
    NameStr = 0,
    WeightStr = 1,
    ScoreStr = 2,
}

enum ClazzMappingsV1Enum {
    ValidAssignment = "ValidAssignment",
    StubAssignment = "StubAssignment",
}

export class JsonFieldV1Resolver implements JsonFieldResolver {

    keyFor(key: keyof typeof JsonFieldV1Enum): string {
        return JsonFieldV1Enum[key];
    }

    clazzFor(clazzName: ClazzKey): string {
        return ClazzMappingsV1Enum[clazzName]
    }
}

export class JsonFieldV2Resolver implements JsonFieldResolver {

    keyFor(key: keyof typeof JsonFieldV2Enum): number {
        return JsonFieldV2Enum[key];
    }

}

export function getSavedQueryStringAndParser(urlSearchParams: URLSearchParams): [string | null, Parser] {
    const v2Params = urlSearchParams.get("s");
    if (v2Params != null) {
        return [v2Params, V2Parser.getInstance()];
    }

    const v1Params = urlSearchParams.get("saved");
    if (v1Params != null) {
        return [v1Params, V1Parser.getInstance()];
    }

    return [null, getLatestParser()];
}
