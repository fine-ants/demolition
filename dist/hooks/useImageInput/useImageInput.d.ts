import { ChangeEvent } from "react";
type Props = {
    sizeLimit?: number;
    extensions?: string[];
    errorMessages?: {
        sizeLimit?: string;
        type?: string;
        extensions?: string;
    };
};
/**
 * A custom hook that handles image input.
 *
 * @param {Object} config Optional.
 * @param {number} config.sizeLimit - in bytes (default 2MB).
 * @param {string[]} config.extensions - An array of accepted image extensions.
 * @param {Object} config.errorMessages - An object of error messages.
 */
export default function useImageInput(config?: Props): {
    imageFilePath: string;
    imageFile: File | null;
    error: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClearImage: () => void;
};
export {};
