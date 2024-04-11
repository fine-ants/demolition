import { handleNumericCallback } from "./handleNumericCallback";

describe("handleNumericCallback util function", () => {
  const mockCallback = jest.fn();

  afterEach(() => {
    mockCallback.mockClear();
  });

  it("should call the callback with an empty string if the input value is an empty string", () => {
    handleNumericCallback({
      value: "",
      callback: mockCallback,
    });
    expect(mockCallback).toHaveBeenCalledWith("");
  });

  it("should call the callback with the formatted value if the input value is a number", () => {
    handleNumericCallback({ value: "1234", callback: mockCallback });
    expect(mockCallback).toHaveBeenCalledWith("1,234");
  });

  it("should call the callback with the unformatted value if the input value is a number and commas are disabled", () => {
    handleNumericCallback({
      value: "1234",
      callback: mockCallback,
      shouldDelimiter: false,
    });
    expect(mockCallback).toHaveBeenCalledWith("1234");
  });

  it("should not call the callback if the input value is not a number", () => {
    handleNumericCallback({ value: "123hi", callback: mockCallback });
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should call the callback with the formatted value using a custom delimiter", () => {
    handleNumericCallback({
      value: "1234",
      callback: mockCallback,
      shouldDelimiter: true,
      delimiter: "-",
    });
    expect(mockCallback).toHaveBeenCalledWith("1-234");
  });
});
