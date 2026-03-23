import { apiClient, ApiError } from "./client";

/**
 * Category Data Interface
 */
export interface Category {
  _id: string;
  name: string;
  slug: string;
  uiLabel?: string;
  priority: number;
  showInNavbar: boolean;
  isActive: boolean;
}

/**
 * Service to handle all Category related API calls
 * It uses the generic apiClient for better error handling and optimization
 */
export const CategoryService = {
  /**
   * Fetch all active categories
   * Optimized with Next.js caching
   */
  async getAll(): Promise<Category[]> {
    try {
      const categories = await apiClient.get<Category[]>("/api/categories", {
        next: {
          revalidate: 3600, // Background revalidation every hour
          tags: ["categories-list"],
        },
      });
      return categories;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Category Fetch Error: [${error.status}]`, error.message);
      } else {
        console.error("Unknown Error fetching categories", error);
      }
      return []; // graceful fallback
    }
  },

  /**
   * Example: Create a new category 
   * (We just built the POST API for this)
   */
  async create(data: Partial<Category>): Promise<Category> {
    const response = await apiClient.post<{ message: string; categories: Category[] }>(
      "/api/categories",
      data
    );
    return response.categories[0];
  },
};

// Also export the existing getCategories function structure for backward compatibility 
// with what we just built, simply mapping it to the new service.
export const getCategories = CategoryService.getAll;
