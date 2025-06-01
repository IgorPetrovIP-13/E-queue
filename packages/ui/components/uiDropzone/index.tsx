"use client";

import { useDropzone } from "react-dropzone";
import { FileSearch } from "lucide-react";
import { FC, useEffect, useState } from "react";
import {Image} from "@heroui/image";

interface Props {
  value: File | string | null;
  onChange: (file: File | null) => void;
}

const UiDropzone: FC<Props> = (props: Props) => {
  const [preview, setPreview] = useState<string>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0] || null;
      props.onChange(file);

      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      } else {
        setPreview(undefined);
      }
    }
  });

  useEffect(() => {
    if (props.value && typeof props.value !== "string") {
      const objectUrl = URL.createObjectURL(props.value);
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
        setPreview(undefined);
      };
    } else if (typeof props.value === "string") {
      setPreview(props.value);
    }
  }, [props.value]);

  return (
    <div
      {...getRootProps()}
      className="border border-default-200 p-4 rounded-lg text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col h-full gap-2 items-center justify-center">
        {preview ? (
          <Image
            radius="sm"
            src={preview}
            width={250}
          />
        ) : (
          <FileSearch size={40} />
        )}
        <p className="text-md">
          Перетягніть файл сюди або{" "}
          <span className="text-primary">натисніть</span> для завантаження.
        </p>
        <p className="text-sm">
          Максимальний розмір файлу: 5 МБ. Дозволені типи файлів:{" "}
          <span className="font-semibold">JPG, PNG, SVG</span>.
        </p>
      </div>
    </div>
  );
};

export default UiDropzone;
