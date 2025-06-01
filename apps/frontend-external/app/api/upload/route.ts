import { NextRequest, NextResponse } from "next/server";

const UPLOADCARE_BASE_URL = "https://upload.uploadcare.com/base/";
const UPLOADCARE_PUBLIC_KEY = process.env.UPLOADCARE_PUBLIC_KEY;
const UPLOADCARE_STORE = process.env.UPLOADCARE_STORE;

export async function POST(request: NextRequest) {
  if (!UPLOADCARE_PUBLIC_KEY) {
    return NextResponse.json(
      { error: "UPLOADCARE_PUBLIC_KEY is not defined" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json(
        { error: "Файл для завантаження відсутній" },
        { status: 400 }
      );
    }

    const uploadData = new FormData();

    uploadData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBLIC_KEY);
    uploadData.append("UPLOADCARE_STORE", UPLOADCARE_STORE ?? "auto");
    uploadData.append("file", file);

    const ucResponse = await fetch(UPLOADCARE_BASE_URL, {
      method: "POST",
      body: uploadData
    });

    if (!ucResponse.ok) {
      return NextResponse.json(
        { error: "Помилка вивантаження файлу" },
        { status: 500 }
      );
    }

    const ucResult = await ucResponse.json();
    const cdnUrl = `https://ucarecdn.com/${ucResult.file}/`;

    return NextResponse.json({ cdnUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
