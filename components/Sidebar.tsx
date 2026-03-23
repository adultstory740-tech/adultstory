import React from "react";
import { SidebarStoryList, SidebarCategories } from "./SidebarWidgets";
import { getCategories } from "../lib/api/categories";
import { StoryService } from "../lib/api/stories";

export default async function Sidebar() {
    // Fetch categories dynamically using our reusable generic service with Next.js Cache
    const categories = await getCategories();

    // Fetch recent stories from the database to replace getLatestStories
    const recentData = await StoryService.getStories(undefined, 1, 4);
    const recent = recentData.stories.map(s => ({
        id: s._id.toString(),
        title: s.title,
        subtitle: new Date(s.createdAt).toLocaleDateString("hi-IN"),
        url: `/story/${s.slug || s._id}`
    }));

    // Fetch trending stories from the database (just simulating by taking a different page for now)
    const trendingData = await StoryService.getStories(undefined, 2, 3);
    const moreLikeThis = trendingData.stories.length > 0
        ? trendingData.stories.map(s => ({
            id: s._id.toString(),
            title: s.title,
            subtitle: "🔥 ट्रेंडिंग",
            url: `/story/${s.slug || s._id}`
          }))
        : recentData.stories.slice(0, 3).map(s => ({
            id: s._id.toString(),
            title: s.title,
            subtitle: "🔥 ट्रेंडिंग",
            url: `/story/${s.slug || s._id}`
          }));

    const popularCategories = [
        { name: "सभी कहानियाँ", slug: "home", href: "/" },
        ...categories.map(cat => ({
            name: cat.uiLabel || cat.name,
            slug: cat.slug,
        }))
    ];

    return (
        <aside className="w-full flex flex-col gap-8">
            <SidebarStoryList title="हाल ही में प्रकाशित" stories={recent} />
            <SidebarStoryList title="ऐसी और कहानियां" stories={moreLikeThis} />
            <SidebarCategories title="लोकप्रिय श्रेणियां" categories={popularCategories} />
        </aside>
    );
}
