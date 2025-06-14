"use client";

import { FC, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Input, InputProps } from "@heroui/input";

const UiPasswordInput: FC<InputProps> = (props: InputProps) => {
  const { errorMessage, ...inputProps } = props;
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      {...inputProps}
      endContent={
        <button
          aria-label="Toggle password visibility"
          className="focus:outline-none mb-1"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
        </button>
      }
      errorMessage={errorMessage}
      isInvalid={Boolean(errorMessage)}
      type={isVisible ? "text" : "password"}
    />
  );
};

export default UiPasswordInput;
