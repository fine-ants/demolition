import { executeCbIfNumeric } from "./executeCbIfNumeric";

describe("executeCbIfNumeric util function", () => {
  const mockCallback = jest.fn();

  afterEach(() => {
    mockCallback.mockClear();
  });

  it("should call the callback with an empty string if the input value is an empty string", () => {
    executeCbIfNumeric({
      value: "",
      callback: mockCallback,
    });
    expect(mockCallback).toHaveBeenCalledWith("");
  });

  it("should call the callback with the formatted value if the input value is a number", () => {
    executeCbIfNumeric({ value: "1234", callback: mockCallback });
    expect(mockCallback).toHaveBeenCalledWith("1,234");
  });

  it("should call the callback with the unformatted value if the input value is a number and commas are disabled", () => {
    executeCbIfNumeric({
      value: "1234",
      callback: mockCallback,
      includeDelimiter: false,
    });
    expect(mockCallback).toHaveBeenCalledWith("1234");
  });

  it("should not call the callback if the input value is not a number", () => {
    executeCbIfNumeric({ value: "123hi", callback: mockCallback });
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should call the callback with the formatted value using a custom delimiter", () => {
    executeCbIfNumeric({
      value: "1234",
      callback: mockCallback,
      includeDelimiter: true,
      delimiter: "-",
    });
    expect(mockCallback).toHaveBeenCalledWith("1-234");
  });
});
