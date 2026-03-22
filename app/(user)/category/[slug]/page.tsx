import StoryGrid from "../../../../components/StoryGrid";
import Sidebar from "../../../../components/Sidebar";
import { stories, CATEGORIES } from "../../../../lib/mockData";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    // Find the matching category object
    const categoryInfo = CATEGORIES.find(c => c.slug === slug);
    const categoryName = categoryInfo ? categoryInfo.name : decodeURIComponent(slug);
    
    // Exact filtering based on the slug mapped in tags
    const categoryStories = stories.filter(story => story.tags.includes(slug));

    const pageTitle = `श्रेणी: ${categoryName}`;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    {categoryStories.length > 0 ? (
                        <StoryGrid title={pageTitle} stories={categoryStories} />
                    ) : (
                        <div className="bg-card border border-border rounded-xl p-8 text-center text-foreground/60 font-medium">
                            इस श्रेणी में अभी कोई कहानी नहीं है।
                        </div>
                    )}
                </div>

                <div className="lg:col-span-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
