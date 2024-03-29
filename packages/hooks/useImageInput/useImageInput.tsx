import { ChangeEvent, useState } from "react";

type Props = {
  sizeLimit?: number; // bytes
  extensions?: string[];
  errorMessages?: {
    sizeLimit?: string;
    type?: string;
    extensions?: string;
  };
  initialImageUrl?: string;
};

/**
 * A custom hook that handles image input.
 *
 * @param {Object} config Optional.
 * @param {number} config.sizeLimit - in bytes (default 2MB).
 * @param {string[]} config.extensions - An array of accepted image extensions.
 * @param {Object} config.errorMessages - An object of error messages.
 */
export default function useImageInput(config?: Props) {
  const {
    sizeLimit = 2000000,
    extensions = ["image/jpeg", "image/png", "image/gif"],
    errorMessages,
    initialImageUrl,
  } = config || {};

  const [imageFilePath, setImageFilePath] = useState(initialImageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    if (files.length > 1) {
      setError("Upload a single image");
      setImageFile(null);
      setImageFilePath("");
      return;
    }

    const newImageFile = files[0];

    if (newImageFile.size > sizeLimit) {
      setError(`Max. Size: ${Math.floor(sizeLimit / 1000000)}MB`);
      setError(
        errorMessages?.sizeLimit ??
          `Max. Size: ${Math.floor(sizeLimit / 1000000)}MB`
      );
      setImageFile(null);
      setImageFilePath("");
      return;
    }

    if (!newImageFile.type.startsWith("image/")) {
      setError("File is not an image");
      setImageFile(null);
      setImageFilePath("");
      return;
    }

    if (extensions && !extensions.includes(newImageFile.type)) {
      setError(errorMessages?.extensions ?? "Image extension not supported");
      setImageFile(null);
      setImageFilePath("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageFilePath(reader.result as string);
    };
    reader.readAsDataURL(newImageFile);

    setImageFile(newImageFile);
    setError("");
  };

  const onClearImage = () => {
    setImageFilePath("");
    setImageFile(null);
    setError("");
  };

  return { imageFilePath, imageFile, error, onChange, onClearImage };
}
