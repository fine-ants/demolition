import validateNickname from ".";

describe("validateNickname util function", () => {
  it("should not throw an error if string is a valid nickname", () => {
    expect(() => validateNickname("demolition")).not.toThrow();
  });

  it("should throw an error if string is not a valid nickname", () => {
    expect(() => validateNickname("demolition1!")).toThrow();
  });

  it("should apply options if provided", () => {
    expect(() =>
      validateNickname("Demo", {
        regExp: new RegExp(/^[a-zA-Z]{2,5}$/),
        errorMessage:
          "Nickname needs to be between 2 to 5 Lowercase/Uppercase Alphabets",
      })
    ).not.toThrow();

    expect(() =>
      validateNickname("demolition1", {
        regExp: new RegExp(/^[a-zA-Z]{2,5}$/),
        errorMessage:
          "Nickname needs to be between 2 to 5 Lowercase/Uppercase Alphabets",
      })
    ).toThrow();
  });
});
