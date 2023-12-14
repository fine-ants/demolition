import { ReactNode } from "react";
export default function useFunnel<S extends string>(steps: [S, ...S[]]): readonly [(({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element) & {
    Step: ({ children }: {
        name: S;
        children: ReactNode;
    }) => import("react/jsx-runtime").JSX.Element;
}, (step: S) => void];
