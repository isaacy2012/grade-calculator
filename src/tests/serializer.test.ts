import { collapseNoFields } from "../util/Serializer";

describe("serializer", () => {
  test("collapseNoFields works correctly", () => {
    const given = ["a", 0, 0, 0, "b"];
    const expected = ["a", 3, "b"];
    expect(collapseNoFields(given)).toEqual(expected);
  });

  test("collapseNoFields works correctly for trailing 0s", () => {
    const given = ["a", 0, 0, 0, "b", 0, 0];
    const expected = ["a", 3, "b", 2];
    expect(collapseNoFields(given)).toEqual(expected);
  });
})
