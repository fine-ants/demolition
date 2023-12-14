"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/**
 * This is a custom hook that handles a funnel component.
 *
 * @param {string[]} steps An array of the name of the steps.
 */
function useFunnel(steps) {
    const [currentStep, setCurrentStep] = (0, react_1.useState)(steps[0]);
    const changeStep = (step) => {
        setCurrentStep(step);
    };
    // Step Component
    // Must receive a name, which will be used in determining which step to render.
    function Step({ children }) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    // Funnel Component
    // Receives only Step components as children.
    function Funnel({ children }) {
        const targetStep = react_1.Children.toArray(children).find((child) => {
            if (!(0, react_1.isValidElement)(child) || child.type !== Step) {
                throw new Error(`${(0, react_1.isValidElement)(child) ? child.type : child} is not a <Funnel.Step> component. All component children of <Funnel> must be a <Funnel.Step>.`);
            }
            return child.props.name === currentStep;
        });
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: targetStep });
    }
    const FunnelComponent = (0, react_1.useMemo)(() => Object.assign(Funnel, { Step }), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStep]);
    return [FunnelComponent, changeStep];
}
exports.default = useFunnel;
//# sourceMappingURL=useFunnel.js.map