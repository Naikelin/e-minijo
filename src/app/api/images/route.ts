import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collectionId = searchParams.get("collectionId");
    const id = searchParams.get("id");
    const image = searchParams.get("image");

    if (!collectionId || !id || !image) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const pbUrl = process.env.PB_URL;
    const fileUrl = `${pbUrl}/api/files/${collectionId}/${id}/${image}`;
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });

    const headers = new Headers();
    headers.set("Content-Type", response.headers["content-type"]);

    return new NextResponse(response.data, { headers });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `GET request error: ${error}` },
      { status: 500 }
    );
  }
}
