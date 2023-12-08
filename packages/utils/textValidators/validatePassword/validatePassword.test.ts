import validatePassword from ".";

describe("validatePassword util function", () => {
  it("should not throw an error if string is a valid password", () => {
    expect(() => validatePassword("hello123!")).not.toThrow();
  });

  it("should throw an error if string is not a valid password", () => {
    expect(() => validatePassword("hello")).toThrow();
  });

  it("should apply options if provided", () => {
    expect(() =>
      validatePassword("demo1", {
        regExp: new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{5,10}$/),
        errorMessage:
          "Password needs to be between 5-10 characters and must contain at least one alphabet, number",
      })
    ).not.toThrow();

    expect(() =>
      validatePassword("demolition1!", {
        regExp: new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{5,10}$/),
        errorMessage:
          "Password needs to be between 8-16 characters and must contain at least one alphabet, number",
      })
    ).toThrow();
  });
});
