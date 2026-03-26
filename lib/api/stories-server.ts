import mongoose from "mongoose";
import connectToDatabase from "../mongodb";
import Content from "../../models/Content";
import Category from "../../models/Category";
import { Story, PaginatedStories } from "./stories";

/**
 * Fetch paginated stories directly from MongoDB
 */
export async function getStoriesDirect(
  categorySlug?: string,
  page = 1,
  limit = 20
): Promise<PaginatedStories> {
  try {
    await connectToDatabase();

    const matchQuery: any = { published: true };

    // ✅ CATEGORY FILTER
    if (categorySlug) {
      const normalizedSlug = categorySlug.toLowerCase().trim();

      const category = await Category.findOne({
        slug: normalizedSlug,
      }).lean();

      if (category) {
        // 🔥 best filter (by ObjectId)
        matchQuery.categoryId = category._id;
      } else {
        // 🔥 fallback (tag match)
        matchQuery.tags = { $in: [normalizedSlug] };
      }
    }

    const skip = (page - 1) * limit;

    const [stories, total] = await Promise.all([
      Content.find(matchQuery)
        .select(
          "title slug excerpt coverImage coverImageAlt tags views likes createdAt isAdult"
        )
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
        createdAt:
          s.createdAt?.toISOString() || new Date().toISOString(),
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
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    };
  }
}

/**
 * Fetch single story by slug or _id
 */
export async function getStoryBySlugDirect(
  slug: string
): Promise<Story | null> {
  try {
    await connectToDatabase();

    // ✅ Normalize slug
    const normalizedSlug = slug.toLowerCase().trim();
    const decodedSlug = decodeURIComponent(normalizedSlug);

    // ✅ Build safe query
    const query: any = {
      $or: [
        { slug: normalizedSlug },
        { slug: decodedSlug },
        { slug: encodeURIComponent(normalizedSlug) }, // 🔥 ADD THIS

      ],
      published: true,
    };

    // ✅ Only add _id if valid
    if (mongoose.isValidObjectId(slug)) {
      query.$or.push({ _id: slug });
    }

    const story = await Content.findOne(query)
      .populate("categoryId", "name slug uiLabel")
      .lean();

    if (!story) return null;

    return {
      ...story,
      _id: story._id.toString(),
      createdAt:
        story.createdAt?.toISOString() || new Date().toISOString(),
    } as Story;
  } catch (error) {
    console.error("Direct Single Story Fetch Error:", error);
    return null;
  }
}