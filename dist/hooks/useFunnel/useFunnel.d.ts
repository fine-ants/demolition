import { ReactNode } from "react";
/**
 * This is a custom hook that handles a funnel component.
 *
 * @param {string[]} steps An array of the name of the steps.
 */
export default function useFunnel<S extends string>(steps: S[]): {
    readonly currentStep: S;
    readonly FunnelComponent: (({ children }: {
        children: ReactNode;
    }) => import("react/jsx-runtime").JSX.Element) & {
        Step: ({ children }: {
            name: S;
            children: ReactNode;
        }) => import("react/jsx-runtime").JSX.Element;
    };
    readonly changeStep: (step: S) => void;
};
