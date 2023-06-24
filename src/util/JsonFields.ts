type JsonField = "Title" | "GradeResolverId" | "Assignments" | "Clazz" | "NameStr" | "Name" | "WeightStr" | "ScoreStr"
type ClazzKey = "ValidAssignment" | "StubAssignment"

export interface JsonFieldResolver {
    keyFor(key: JsonField): string
    isValidClazz(clazzName: string): clazzName is ClazzKey
    clazzFor(clazzName: ClazzKey): string | number
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
    Title = "",
    GradeResolverId = "g",
    Assignments = "a",
    // Inside Assignment
    Clazz = "",
    NameStr = "n",
    Name = "n", // NameStr and Name are actually the same, but V1 differentiated them in Stub and Valid for no particular reason
    WeightStr = "w",
    ScoreStr = "s",
}

enum ClazzMappingsV1Enum {
    ValidAssignment = "ValidAssignment",
    StubAssignment = "StubAssignment",
}

enum ClazzMappingsV2Enum {
    ValidAssignment = 1,
    StubAssignment = 2,
}

const JsonFieldV1Resolver: JsonFieldResolver = {
    keyFor(key: JsonField): string {
        return JsonFieldV1Enum[key];
    },

    isValidClazz(clazzName: string): clazzName is ClazzKey {
        return clazzName in ClazzMappingsV1Enum
    },

    clazzFor(clazzName: ClazzKey): string {
        return ClazzMappingsV1Enum[clazzName]
    }
}

const JsonFieldV2Resolver: JsonFieldResolver = {
    keyFor(key: JsonField): string {
        return JsonFieldV2Enum[key];
    },

    isValidClazz(clazzName: string): clazzName is ClazzKey {
        return clazzName in ClazzMappingsV2Enum
    },

    clazzFor(clazzName: ClazzKey): string | number {
        return ClazzMappingsV2Enum[clazzName];
    }
}

const JsonFieldLatestResolver = JsonFieldV2Resolver;

export function getSavedQueryStringAndResolver(urlSearchParams: URLSearchParams): [string | null, JsonFieldResolver] {
    const v2Params = urlSearchParams.get("s");
    if (v2Params != null) {
        console.log("returned v2")
        return [v2Params, JsonFieldV2Resolver];
    }

    const v1Params = urlSearchParams.get("saved");
    if (v1Params != null) {
        console.log("returned v1")
        return [v1Params, JsonFieldV1Resolver];
    }

    return [null, JsonFieldLatestResolver];
}
