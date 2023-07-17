import { SerializableAssignment } from "../model/Assignment";
import { compressToBase64 } from "@amoutonbrady/lz-string"
import { JsonIntCode, JsonOptCompressed, JsonOptStr } from "./JsonFields";

export function orNoField<T>(t: T | null): T | JsonIntCode.NoField {
    if (typeof t == "string" && t === "") return JsonIntCode.NoField;
    if (t == null) return JsonIntCode.NoField;
    return t;
}

export function orNull(s: string | undefined | JsonIntCode.NoField): string | null {
    if (s == null || s === JsonIntCode.NoField) return null;
    return s;
}

export function orEmptyStr(s: string | undefined | JsonIntCode.NoField): string {
    if (s == null || s === JsonIntCode.NoField) return "";
    return s;
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

export function collapseNoFields(arr: JsonOptStr[]): JsonOptCompressed[] {
    const ret = [];
    let acc = 0;
    for (const item of arr) {
        if (item === JsonIntCode.NoField) {
            acc++;
        } else {
            if (acc > 0) {
                ret.push(acc);
                acc = 0;
            }
            ret.push(item);
        }
    }
    // push final acc if exists
    if (acc > 0) {
        ret.push(acc);
    }
    return ret;
}

export function writeCompressedJSON(
    title: string,
    gradeResolverId: string | null,
    assignments: SerializableAssignment[],
    serializer: (a: SerializableAssignment) => [JsonOptStr, JsonOptStr, JsonOptStr] | [JsonOptStr, JsonOptStr, JsonIntCode.NoField]
): string {
    const strToCompress = JSON.stringify(
        collapseNoFields([
            orNoField(title),
            orNoField(gradeResolverId),
            ...assignments.flatMap(it => serializer(it))
        ])
    ).slice(1, -1);
    let compressed = compressToBase64(strToCompress);
    console.log(strToCompress);
    // compressToBase64 adds some number of '=' at the end of the string, which is not stylish for URLs, so we remove it.
    // Decompression without the '=' works fine.
    if (compressed.endsWith("=")) {
        compressed = trimEnd(compressed, "=");
    }
    return compressed;
}
