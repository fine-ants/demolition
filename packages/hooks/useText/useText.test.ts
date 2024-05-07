import { renderHook } from "@testing-library/react";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@utils/textValidators";
import { act } from "react-dom/test-utils";
import useText from "./useText";

describe("useText hook", () => {
  it("should successfully render the initial value", () => {
    const { result } = renderHook(() => useText({ initialValue: "text" }));
    expect(result.current.value).toBe("text");
  });

  it("should successfully change the value", () => {
    const { result } = renderHook(() => useText());
    const { onChange } = result.current;
    act(() => {
      onChange("hello");
    });
    expect(result.current.value).toBe("hello");
    expect(result.current.error).toBe("");
  });

  it("should successfully change the value after passing the validator", () => {
    const { result } = renderHook(() =>
      useText({ validators: [validateNickname] })
    );
    const { onChange } = result.current;
    act(() => {
      onChange("nickname");
    });
    expect(result.current.value).toBe("nickname");
    expect(result.current.error).toBe("");
  });

  it("should throw an error for the first validator if multiple validators throw errors", () => {
    const { result } = renderHook(() =>
      useText({ validators: [validateEmail, validatePassword] })
    );
    const { onChange } = result.current;
    act(() => {
      onChange("hello");
    });
    expect(result.current.error).toBe("Invalid Email");
  });

  it("should successfully reset the error after receiving a new valid input", () => {
    const { result } = renderHook(() =>
      useText({ validators: [validateEmail] })
    );
    const { onChange } = result.current;

    act(() => {
      onChange("hello");
    });
    expect(result.current.error).toBe("Invalid Email");

    act(() => {
      onChange("test@test.com");
    });
    expect(result.current.error).toBe("");
  });

  it("isError should not be true if value is empty", () => {
    const { result } = renderHook(() =>
      useText({ validators: [validateEmail] })
    );
    expect(result.current.isError).toBe(false);
  });
});
