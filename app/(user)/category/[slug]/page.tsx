
export const dynamic = "force-dynamic"; // 🔥 VERY IMPORTANT


import StoryGrid from "../../../../components/StoryGrid";
import Sidebar from "../../../../components/Sidebar";
import { getCategories } from "../../../../lib/api/categories";
import { StoryService } from "../../../../lib/api/stories";

export default async function CategoryPage({
    params,
}: {
    params: { slug: string }; // ✅ FIXED
}) {
    const { slug } = await params;

    const categories = await getCategories();

    // Find the matching category object
    const categoryInfo = categories.find(c => c.slug === slug);
    const categoryName = categoryInfo ? (categoryInfo.uiLabel || categoryInfo.name) : decodeURIComponent(slug);

    // Fetch stories from our optimized dynamic API
    const paginatedData = await StoryService.getStories(slug, 1, 20);

    const categoryStories = paginatedData?.stories || [];

    const pageTitle = `श्रेणी: ${categoryName}`;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <StoryGrid title={pageTitle} stories={categoryStories} />
                </div>

                <div className="lg:col-span-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
