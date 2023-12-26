import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Fragment } from "react";
import useImageInput from "./useImageInput";

function TestComponent() {
  const { imageFilePath, imageFile, error, onChange } = useImageInput();

  return (
    <Fragment>
      <input
        title="image-input"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
      <p title="input-error">{error}</p>
      <p title="image-file-path">{imageFilePath}</p>
      <p title="image-file-name">{imageFile?.name}</p>
    </Fragment>
  );
}

describe("useImageInput hook", () => {
  it("should successfully change the image file", async () => {
    const { getByTitle } = render(<TestComponent />);

    fireEvent.change(getByTitle("image-input"), {
      target: {
        files: [
          new File(["hello"], "hello.png", {
            type: "image/png",
          }),
        ],
      },
    });

    await waitFor(() => {
      expect(getByTitle("image-file-name").textContent).toBe("hello.png");
      expect(getByTitle("image-file-path").textContent).not.toBe("");
      expect(getByTitle("input-error").textContent).toBe("");
    });
  });

  it("should not accept the image file if it is too large", async () => {
    const { getByTitle } = render(<TestComponent />);

    const largeFile = new File(["0".repeat(2000001)], "largeFile.png", {
      type: "image/png",
    });

    act(() => {
      fireEvent.change(getByTitle("image-input"), {
        target: {
          files: [largeFile],
        },
      });
    });

    await waitFor(() => {
      expect(getByTitle("image-file-name").textContent).toBe("");
      expect(getByTitle("image-file-path").textContent).toBe("");
      expect(getByTitle("input-error").textContent).toBe("Max. Size: 2MB");
    });
  });

  it("should not accept the image file if the extension is invalid", async () => {
    const { getByTitle } = render(<TestComponent />);

    const svgFile = new File(["0".repeat(2000000)], "svgFile.svg", {
      type: "image/svg+xml",
    });

    act(() => {
      fireEvent.change(getByTitle("image-input"), {
        target: {
          files: [svgFile],
        },
      });
    });

    await waitFor(() => {
      expect(getByTitle("image-file-name").textContent).toBe("");
      expect(getByTitle("image-file-path").textContent).toBe("");
      expect(getByTitle("input-error").textContent).toBe(
        "Image extension not supported"
      );
    });
  });
});
