"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * A custom hook that handles image input.
 *
 * @param {Object} config Optional.
 * @param {number} config.sizeLimit - in bytes (default 2MB).
 * @param {string[]} config.extensions - An array of accepted image extensions.
 * @param {Object} config.errorMessages - An object of error messages.
 */
function useImageInput(config) {
    const { sizeLimit = 2000000, extensions = ["image/jpeg", "image/png", "image/gif"], errorMessages, } = config || {};
    const [imageFilePath, setImageFilePath] = (0, react_1.useState)("");
    const [imageFile, setImageFile] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)("");
    const onChange = (e) => {
        const files = e.target.files;
        if (!files)
            return;
        if (files.length > 1) {
            setError("Upload a single image");
            setImageFile(null);
            setImageFilePath("");
            return;
        }
        const newImageFile = files[0];
        if (newImageFile.size > sizeLimit) {
            setError(`Max. Size: ${Math.floor(sizeLimit / 1000000)}MB`);
            setError(errorMessages?.sizeLimit ??
                `Max. Size: ${Math.floor(sizeLimit / 1000000)}MB`);
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
            setImageFilePath(reader.result);
        };
        reader.readAsDataURL(newImageFile);
        setImageFile(newImageFile);
        setError("");
    };
    return { imageFilePath, imageFile, error, onChange };
}
exports.default = useImageInput;
//# sourceMappingURL=useImageInput.js.map