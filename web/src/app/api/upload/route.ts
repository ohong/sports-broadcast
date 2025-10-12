import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("video");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Upload a video file using the `video` field." },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));

    return NextResponse.json({
      videoUrl: "/commented.mp4",
    });
  } catch (error) {
    console.error("Upload processing failed:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected processing error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
