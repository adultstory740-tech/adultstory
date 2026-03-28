import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";
import Category from "@/models/Category";
import { getStoriesDirect } from "@/lib/api/stories-server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      categories,
      isAdult,
      published,
      slug,
      meta,
      tags: tagsFromBody,
    } = body;

    // Validate inputs
    if (!title || !content || !categories || !categories.length) {
      return NextResponse.json(
        { error: "Title, content, and at least one category slug are required." },
        { status: 400 }
      );
    }

    // Lookup categories by slugs
    const dbCategories = await Category.find({ slug: { $in: categories } });
    if (!dbCategories.length) {
      return NextResponse.json(
        { error: "Provided categories do not exist in the database." },
        { status: 400 }
      );
    }

    // Set primary categoryId to the first matching category
    const primaryCategoryId = dbCategories[0]._id;

    // Process plain text content into Blocks
    // We split by double newline blocks. If a block is short and doesn't end with punctuation, it might be a heading. 
    // Just mapping them all as paragraphs for now, we can refine later.
    const rawBlocks = content.split(/\n\s*\n/).filter((b: string) => b.trim().length > 0);
    const contentBlocks = rawBlocks.map((text: string, index: number) => {
      // Basic heuristic: if it's very short and bolded/no punctuation, could be a heading.
      // We'll just default to paragraph to keep it simple.
      return {
        type: "paragraph",
        data: text.trim(),
        order: index,
      };
    });

    // Create the Content (Story)
    const tagList =
      Array.isArray(tagsFromBody) && tagsFromBody.length > 0
        ? tagsFromBody.map(String)
        : categories;

    const newStory = new Content({
      title,
      slug: typeof slug === "string" && slug.trim() ? slug.trim().toLowerCase() : undefined,
      excerpt: excerpt || content.substring(0, 150) + "...",
      categoryId: primaryCategoryId,
      tags: tagList,
      contentBlocks,
      type: "story",
      published: published !== undefined ? published : true,
      isAdult: isAdult !== undefined ? isAdult : true,
      meta:
        meta && typeof meta === "object"
          ? {
              title: meta.title,
              description: meta.description,
              keywords: Array.isArray(meta.keywords) ? meta.keywords : undefined,
            }
          : undefined,
    });

    await newStory.save();

    return NextResponse.json(
      { 
        message: "Story successfully created", 
        storyId: newStory._id,
        slug: newStory.slug
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating story:", error);
    return NextResponse.json(
      { error: "Failed to create story", details: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const paginatedData = await getStoriesDirect(categorySlug || undefined, page, limit);

    return NextResponse.json(
      paginatedData,
      {
        status: 200,
        headers: {
          // Cache the response
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error: any) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories", details: error.message },
      { status: 500 }
    );
  }
}

