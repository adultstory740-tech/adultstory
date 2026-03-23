import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectToDatabase();

    // We can query by either _id or slug since both are unique enough
    // But typically the URL param is the slug, so we query by it first, falling back to ID if it's a valid ObjectId
    let matchQuery: any = { slug };

    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        // It's a valid ObjectId
        matchQuery = { $or: [{ _id: slug }, { slug }] };
    }

    const story = await Content.findOne(matchQuery).lean();

    if (!story) {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      );
    }

    // Increment view count asynchronously (fire and forget)
    // In a high traffic scenario this should be rate limited or done via redis
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
