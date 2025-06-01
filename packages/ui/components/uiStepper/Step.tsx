import { FC } from "react";
import { Button } from "@heroui/button";
import Link from "next/link";
import { StepData } from "./types/step";

interface Props extends StepData {
  stepIndex: number;
  isActive?: boolean;
}

const Step: FC<Props> = ({
  stepIndex,
  stepTitle,
  stepDescription,
  isActive,
	href,
}) => {
  return (
    <li className="flex-1 flex items-center justify-center">
      <Button
        as={Link}
        color={isActive ? "primary" : "default"}
        variant="flat"
        href={href}
        className="flex flex-col gap-1 h-auto w-full p-2 align-start"
      >
        <div
          style={!isActive ? {} : { boxShadow: "0 0 5px #004493" }}
          className="flex items-center justify-center w-8 h-8 rounded-full p-4 text-lg"
        >
          {stepIndex}
        </div>
        <span className="inline-block text-lg">{stepTitle}</span>
        <span
          className={`inline-block ${isActive ? "text-[#CCE3FD]" : "text-default-500"} text-xs`}
        >
          {stepDescription}
        </span>
      </Button>
    </li>
  );
};

export default Step;
