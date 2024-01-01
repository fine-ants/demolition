import { Children, ReactNode, isValidElement, useMemo, useState } from "react";

/**
 * This is a custom hook that handles a funnel component.
 *
 * @param {string[]} steps An array of the name of the steps.
 */
export default function useFunnel<S extends string>(steps: S[]) {
  const [currentStep, setCurrentStep] = useState<S>(steps[0]);

  const changeStep = (step: S) => {
    setCurrentStep(step);
  };

  // Step Component
  // Must receive a name, which will be used in determining which step to render.
  function Step({ children }: { name: S; children: ReactNode }) {
    return <>{children}</>;
  }

  // Funnel Component
  // Receives only Step components as children.
  function Funnel({ children }: { children: ReactNode }) {
    const targetStep = Children.toArray(children).find((child) => {
      if (!isValidElement(child) || child.type !== Step) {
        throw new Error(
          `${
            isValidElement(child) ? child.type : child
          } is not a <Funnel.Step> component. All component children of <Funnel> must be a <Funnel.Step>.`
        );
      }
      return child.props.name === currentStep;
    });

    return <>{targetStep}</>;
  }

  const FunnelComponent = useMemo(
    () => Object.assign(Funnel, { Step }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStep]
  );

  return { currentStep, FunnelComponent, changeStep } as const;
}
