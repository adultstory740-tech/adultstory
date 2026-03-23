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
  /**
   * Fetch paginated stories, optionally filtered by category
   */
  async getStories(category?: string, page = 1, limit = 20): Promise<PaginatedStories> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (category) {
        queryParams.append("category", category);
      }

      const response = await apiClient.get<PaginatedStories>(`/api/stories?${queryParams.toString()}`, {
        next: {
          revalidate: 300, // 5 minutes cache
          tags: category ? [`stories-category-${category}`] : ["stories-all"],
        },
      });

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Story Fetch Error: [${error.status}]`, error.message);
      }
      // Return empty fallback
      return { stories: [], pagination: { total: 0, page, limit, totalPages: 0 } };
    }
  },

  /**
   * Fetch a single story fully mapped by slug
   */
  async getStoryBySlug(slug: string): Promise<Story | null> {
    try {
      const story = await apiClient.get<Story>(`/api/stories/${slug}`, {
        next: {
          revalidate: 300,
          tags: [`story-${slug}`],
        },
      });
      return story;
    } catch (error) {
      return null;
    }
  }
};
