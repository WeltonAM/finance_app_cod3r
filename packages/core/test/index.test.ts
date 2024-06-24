import soma from "../src/index";

describe("soma", () => {
  it("should return the sum of two numbers", () => {
    expect(soma(1, 1)).toBe(2);
  });
});
