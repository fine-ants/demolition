import { renderHook } from "@testing-library/react";
import { validateEmail, validatePassword } from "@utils/textValidators";
import { act } from "react-dom/test-utils";
import useText from "./useText";

describe("useText hook", () => {
  it("should successfully change the value", () => {
    const { result } = renderHook(() => useText());
    const { onChange } = result.current;
    act(() => {
      onChange("hello");
    });
    expect(result.current.value).toBe("hello");
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
});
