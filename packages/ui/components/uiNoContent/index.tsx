import { FileWarning } from "lucide-react";
import { FC } from "react";

interface Props {
  text: string;
}

const UiNoContent: FC<Props> = ({ text }) => {
  return (
    <div className="flex bg-warning-100 rounded-md px-6 py-6">
      <p className="flex gap-2 items-center justify-center text-warning-500">
        <FileWarning size={22} /> {text}
      </p>
    </div>
  );
};

export default UiNoContent;
