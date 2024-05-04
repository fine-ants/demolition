import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useNumber from "./useNumber";

const isPositiveNumber = (value: number) => {
  if (value <= 0) {
    throw new Error("Number must be positive (greater than 0)");
  }
};
const isOddNumber = (value: number) => {
  if (value % 2 === 0) {
    throw new Error("Number must be odd");
  }
};

describe("useNumber hook", () => {
  it("should successfully change the value", () => {
    const { result } = renderHook(() => useNumber());
    const { onChange } = result.current;
    act(() => {
      onChange("1000");
    });
    expect(result.current.value).toBe("1,000");
    expect(result.current.error).toBe("");
  });

  it("should successfully change the value after passing the validator", () => {
    const { result } = renderHook(() =>
      useNumber({ validators: [isPositiveNumber] })
    );
    const { onChange } = result.current;
    act(() => {
      onChange("1");
    });
    expect(result.current.value).toBe("1");
    expect(result.current.error).toBe("");
  });

  it("should throw an error for the first validator if multiple validators throw errors", () => {
    const { result } = renderHook(() =>
      useNumber({ validators: [isPositiveNumber, isOddNumber] })
    );
    const { onChange } = result.current;
    act(() => {
      onChange("0");
    });
    expect(result.current.error).toBe(
      "Number must be positive (greater than 0)"
    );
  });

  it("should successfully reset the error after receiving a new valid input", () => {
    const { result } = renderHook(() =>
      useNumber({ validators: [isPositiveNumber] })
    );
    const { onChange } = result.current;

    act(() => {
      onChange("0");
    });
    expect(result.current.error).toBe(
      "Number must be positive (greater than 0)"
    );

    act(() => {
      onChange("1");
    });
    expect(result.current.error).toBe("");
  });

  it("should not include delimiters if delimiters is set to false (1)", () => {
    const { result } = renderHook(() => useNumber({ delimiters: false }));
    const { onChange } = result.current;
    act(() => {
      onChange("1000");
    });
    expect(result.current.value).toBe("1000");
  });

  it("should not include delimiters if delimiters is set to false (2)", () => {
    const { result } = renderHook(() =>
      useNumber({ validators: [isPositiveNumber], delimiters: false })
    );
    const { onChange } = result.current;
    act(() => {
      onChange("1000");
    });
    expect(result.current.value).toBe("1000");
  });

  it("isError should not be true if value is empty", () => {
    const { result } = renderHook(() => useNumber());
    expect(result.current.isError).toBe(false);
  });
});
