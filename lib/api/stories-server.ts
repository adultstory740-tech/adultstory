import mongoose from "mongoose";
import connectToDatabase from "../mongodb";
import Content from "../../models/Content";
import Category from "../../models/Category";
import { Story, PaginatedStories } from "./stories";

/**
 * Server-only service to fetch stories directly from MongoDB.
 * Avoids network overhead and "Dynamic server usage" errors on Vercel.
 */
export async function getStoriesDirect(
  categorySlug?: string,
  page = 1,
  limit = 20
): Promise<PaginatedStories> {
  try {
    await connectToDatabase();

    const matchQuery: any = { published: true };

    if (categorySlug) {
      // 1. First attempt: Find category by slug to get its ID
      const category = await Category.findOne({ slug: categorySlug }).lean();

      if (category) {
        // Filter by categoryId (the most reliable way)
        matchQuery.categoryId = category._id;
      } else {
        // 2. Fallback: Filter by tags (in case stories are only tagged with the slug)
        matchQuery.tags = categorySlug;
      }
    }

    const skip = (page - 1) * limit;

    const [stories, total] = await Promise.all([
      Content.find(matchQuery)
        .select("title slug excerpt coverImage coverImageAlt tags views likes createdAt isAdult")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Content.countDocuments(matchQuery),
    ]);

    return {
      stories: stories.map((s: any) => ({
        ...s,
        _id: s._id.toString(),
        createdAt: s.createdAt?.toISOString() || new Date().toISOString(),
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Direct Story Fetch Error:", error);
    return {
      stories: [],
      pagination: { total: 0, page, limit, totalPages: 0 },
    };
  }
}

/**
 * Fetch a single story directly from MongoDB by slug (or _id).
 */
export async function getStoryBySlugDirect(slug: string): Promise<Story | null> {
  try {
    await connectToDatabase();

    const story = await Content.findOne({ 
      $or: [{ slug: slug }, { _id: mongoose.isValidObjectId(slug) ? slug : undefined }],
      published: true 
    })
    .populate('categoryId', 'name slug uiLabel')
    .lean();

    if (!story) return null;

    return {
      ...story,
      _id: story._id.toString(),
      createdAt: story.createdAt?.toISOString() || new Date().toISOString(),
    } as unknown as Story;
  } catch (error) {
    console.error("Direct Single Story Fetch Error:", error);
    return null;
  }
}
