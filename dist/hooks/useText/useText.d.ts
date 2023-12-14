type Props = {
    initialValue?: string;
    validators?: Array<(value: string) => void>;
};
export default function useText(options?: Props): {
    value: string;
    error: string;
    isError: boolean;
    onChange: (newVal: string) => void;
};
export {};
