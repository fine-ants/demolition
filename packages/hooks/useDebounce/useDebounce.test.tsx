import { act, fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import useDebounce from "./useDebounce";

describe("useDebounce hook", () => {
  it("should successfully change the value (default delay)", () => {
    jest.useFakeTimers();
    const mockSetTimeout = jest.spyOn(global, "setTimeout");

    function Component() {
      const [text, setText] = useState("");
      const debouncedValue = useDebounce(text);

      return (
        <div>
          <input
            title="input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p title="debounced-value">{debouncedValue}</p>
        </div>
      );
    }

    const { getByTitle } = render(<Component />);
    const input = getByTitle("input");
    const debouncedValue = getByTitle("debounced-value");

    fireEvent.change(input, { target: { value: "hello" } });
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(debouncedValue.textContent).toBe("hello");
    expect(mockSetTimeout).toHaveBeenCalledTimes(2); // initial render + 1 fireEvent
  });

  it("should successfully change the value (custom delay)", () => {
    jest.useFakeTimers();
    const mockSetTimeout = jest.spyOn(global, "setTimeout");

    function Component() {
      const [text, setText] = useState("");
      const debouncedValue = useDebounce(text, 500);

      return (
        <div>
          <input
            title="input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p title="debounced-value">{debouncedValue}</p>
        </div>
      );
    }

    const { getByTitle } = render(<Component />);
    const input = getByTitle("input");
    const debouncedValue = getByTitle("debounced-value");

    fireEvent.change(input, { target: { value: "hello" } });
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(debouncedValue.textContent).toBe("");
    fireEvent.change(input, { target: { value: "hello world" } });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockSetTimeout).toHaveBeenCalledTimes(3); // initial render + 2 fireEvents
    expect(debouncedValue.textContent).toBe("hello world");
  });
});
