"use client";

import { FC } from "react";
import Step from "./Step";
import { usePathname } from "next/navigation";
import { StepData } from "./types/step";

interface Props {
	currentRoute: string;
  data: StepData[];
}

const UiStepper: FC<Props> = ({ data }) => {
	const pathname = usePathname();
  return (
    <ul className="flex gap-4 rounded-lg cursor-pointer">
      {data.map((step, index) => (
        <Step
          stepIndex={index + 1}
          stepTitle={step.stepTitle}
          stepDescription={step.stepDescription}
					isActive={pathname === step.href}
          key={index}
					href={step.href}
        />
      ))}
    </ul>
  );
};

export default UiStepper;
