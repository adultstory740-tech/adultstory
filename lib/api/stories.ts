import { apiClient, ApiError } from "./client";

/**
 * Story Data Interface based on our Content schema
 */
export interface Story {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  tags: string[];
  views: number;
  likes: number;
  createdAt: string;
  isAdult: boolean;
  contentBlocks?: any[]; // Populated when fetching full story
}

export interface PaginatedStories {
  stories: Story[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Service to handle all Story related API calls
 * Utilizing our generic robust `apiClient`
 */
export const StoryService = {
  async getStories(
    category?: string,
    page = 1,
    limit = 20
  ): Promise<PaginatedStories> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (category) {
        queryParams.append("category", category.toLowerCase().trim());
      }

      const response = await apiClient.get<PaginatedStories>(
        `/api/stories?${queryParams.toString()}`,
        {
          cache: "no-store", // 🔥 FIX
        }
      );

      return response;
    } catch (error) {
      console.error("Story Fetch Error:", error);

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
  },

  async getStoryBySlug(slug: string): Promise<Story | null> {
    try {
      const story = await apiClient.get<Story>(
        `/api/stories/${slug}`,
        {
          cache: "no-store", // 🔥 FIX
        }
      );
      return story;
    } catch (error) {
      return null;
    }
  },
};
