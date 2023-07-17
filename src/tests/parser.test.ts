import { expandNoFields } from "../util/parser/V2Parser";

describe("deserializer", () => {
  test("collapseNoFields works correctly", () => {
    const given = ["a", 3, "b"];
    const expected = ["a", 0, 0, 0, "b"];
    expect(expandNoFields(given)).toEqual(expected);
  });

  test("collapseNoFields works correctly for trailing 0s", () => {
    const given = ["a", 3, "b", 2];
    const expected = ["a", 0, 0, 0, "b", 0, 0];
    expect(expandNoFields(given)).toEqual(expected);
  });
})
