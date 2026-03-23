import connectToDatabase from "../mongodb";
import Category from "../../models/Category";
import { apiClient } from "./client";

export interface CategoryData {
    _id: string;
    name: string;
    slug: string;
    uiLabel?: string;
    priority?: number;
    showInNavbar?: boolean;
}

export async function getCategories(): Promise<CategoryData[]> {
    try {
        await connectToDatabase();
        
        // Fetch active categories that should be in the navbar
        const categories = await Category.find({ 
            isActive: true,
            showInNavbar: true 
        })
        .select('_id name slug uiLabel priority showInNavbar')
        .sort({ priority: 1, name: 1 })
        .lean();

        // Convert MongoDB ObjectIds to strings so they can be serialized and passed to Client Components if needed
        return categories.map((cat: any) => ({
            _id: cat._id.toString(),
            name: cat.name,
            slug: cat.slug,
            uiLabel: cat.uiLabel,
            priority: cat.priority,
            showInNavbar: cat.showInNavbar
        }));
    } catch (error) {
        console.error("Failed to fetch categories natively:", error);
        return [];
    }
}

export const CategoryService = {
    getAll: getCategories,
    // Add other methods like create, update here if needed in frontend
    create: async (data: Partial<CategoryData>) => {
        return await apiClient.post<CategoryData>("/api/categories", data);
    }
};
