import { useState } from 'react';

export const useStepsState = () => {
    const [steps, setSteps] = useState<string[] | []>([]);

    return {
        steps,
        addStep: (step: string) => {
            setSteps([...steps, step]);
        },
        deleteStep: (StepIndex: number) => {
            const newSteps = steps.filter((_, index) => index !== StepIndex);
            setSteps(newSteps);
        }
    };
};
