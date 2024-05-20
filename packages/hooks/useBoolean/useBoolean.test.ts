import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useBoolean from "./useBoolean";

describe("useBoolean hook", () => {
  it("should successfully render the default value to false", () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current.state).toBe(false);
  });

  it("should successfully render the provided initial value", () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.state).toBe(true);
  });

  it("should successfully update the state from false to true", () => {
    const { result } = renderHook(() => useBoolean());
    const { setTrue } = result.current;
    act(() => {
      setTrue();
    });
    expect(result.current.state).toBe(true);
  });

  it("should successfully update the state from true to false", () => {
    const { result } = renderHook(() => useBoolean(true));
    const { setFalse } = result.current;
    act(() => {
      setFalse();
    });
    expect(result.current.state).toBe(false);
  });

  it("should successfully update the state to the manually provided boolean value", () => {
    const { result } = renderHook(() => useBoolean());
    const { setState } = result.current;

    act(() => {
      setState(true);
    });
    expect(result.current.state).toBe(true);

    act(() => {
      setState(false);
    });
    expect(result.current.state).toBe(false);
  });

  it("should successfully update the current value to the opposite boolean value", () => {
    const { result } = renderHook(() => useBoolean());
    const { setOpposite } = result.current;

    act(() => {
      setOpposite();
    });
    expect(result.current.state).toBe(true);

    act(() => {
      setOpposite();
    });
    expect(result.current.state).toBe(false);
  });
});
