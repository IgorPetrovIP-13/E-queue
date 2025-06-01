"use client";

import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import { FC } from "react";
import { IAttachment } from "@repo/core/types/attachment.types";

import "@uploadcare/react-uploader/core.css";
import "@repo/ui/components/uiMultipleDropzone/styles.css";

interface Props {
  onChange: (value: IAttachment[]) => void;
}

const UiMultipleDropzone: FC<Props> = ({ onChange }) => {
  return (
    <FileUploaderMinimal
      sourceList="local, camera, facebook, gdrive"
      classNameUploader="uc-dark uc-gray"
      pubkey="b1927c9a40501f3c9d81"
      maxLocalFileSizeBytes={5242880}
      multipleMax={5}
      cloudImageEditorAutoOpen={true}
      multiple
      onChange={fileInfos => {
        onChange(
          fileInfos.successEntries.map(fileInfo => {
            return {
              name: fileInfo.name,
              href: fileInfo.cdnUrl
            };
          })
        );
      }}
    />
  );
};

export default UiMultipleDropzone;
