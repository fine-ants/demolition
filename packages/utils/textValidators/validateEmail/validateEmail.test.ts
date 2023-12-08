import validateEmail from ".";

describe("validateEmail util function", () => {
  it("should not throw an error if string is a valid email", () => {
    expect(() => validateEmail("blah@blah.com")).not.toThrow();
  });

  it("should throw an error if string is not a valid email", () => {
    expect(() => validateEmail("blah")).toThrow();
  });

  it("should apply options if provided", () => {
    expect(() =>
      validateEmail("demolition@demolition.com", {
        regExp: new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+com))$/
        ),
        errorMessage: "Emails can only end in .com",
      })
    ).not.toThrow();

    expect(() =>
      validateEmail("demolition@demolition.co", {
        regExp: new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+com))$/
        ),
        errorMessage: "Emails can only end in .com",
      })
    ).toThrow();
  });
});
