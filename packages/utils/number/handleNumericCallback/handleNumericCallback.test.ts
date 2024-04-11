import { handleNumericCallback } from "./handleNumericCallback";

describe("handleNumericCallback util function", () => {
  const mockCallback = jest.fn();

  afterEach(() => {
    mockCallback.mockClear();
  });

  it("should call the callback with an empty string if the input value is an empty string", () => {
    handleNumericCallback("", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith("");
  });

  it("should call the callback with the formatted value if the input value is a number", () => {
    handleNumericCallback("1234", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith("1,234");
  });

  it("should call the callback with the unformatted value if the input value is a number and commas are disabled", () => {
    handleNumericCallback("1234", mockCallback, false);
    expect(mockCallback).toHaveBeenCalledWith("1234");
  });

  test("should not call the callback if the input value is not a number", () => {
    handleNumericCallback("123hi", mockCallback);
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
