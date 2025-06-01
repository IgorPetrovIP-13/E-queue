import { IUploadFileRes } from "./upload-file-types";

class UploadFileService {
  private readonly BASE_URL = "/api/upload";

  async uploadFile(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(this.BASE_URL, {
      method: "POST",
      body: formData
    });

    const json: IUploadFileRes = await response.json();

    return json.cdnUrl;
  }
}

export const uploadFileService = new UploadFileService();
