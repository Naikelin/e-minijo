import { NextRequest, NextResponse } from "next/server";
import PocketBase from "pocketbase";
import authenticate from "../middlewares/login_pb";

const pb = new PocketBase(process.env.PB_URL);

export async function GET(req: NextRequest) {
  try {
    await authenticate(pb);

    const latestPath = req.url.split("/").pop();
    const collection = latestPath as string;

    const resultList = await pb.collection(collection).getList(1, 50);

    resultList.items.forEach((item) => {
      item.images = item.images.map((image: string) => {
        return `/api/images?collectionId=${item.collectionId}&id=${item.id}&image=${image}`;
      });
    });
    console.log(resultList);

    return NextResponse.json({
      message: "GET request successful",
      data: resultList,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `GET request error: ${error}` },
      { status: 500 }
    );
  }
}
