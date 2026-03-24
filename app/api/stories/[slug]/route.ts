import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";
import { getStoryBySlugDirect } from "@/lib/api/stories-server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const story = await getStoryBySlugDirect(slug);

    if (!story) {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      );
    }

    // Increment view count asynchronously (fire and forget)
    // We import Content here or pass it to the service if needed, but for now we can just use the model directly as it's an API route.
    Content.updateOne({ _id: story._id }, { $inc: { views: 1 } }).exec().catch(e => console.error("View increment error", e));

    return NextResponse.json(story, {
      status: 200,
      headers: {
        // Cache single story for 1 minute
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error: any) {
    console.error("Error fetching single story:", error);
    return NextResponse.json(
      { error: "Failed to fetch story", details: error.message },
      { status: 500 }
    );
  }
}
