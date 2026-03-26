import React from "react";
import { SidebarStoryList, SidebarCategories } from "./SidebarWidgets";
import { getCategories } from "../lib/api/categories";
import { getStoriesDirect } from "../lib/api/stories-server";

export default async function Sidebar() {
    // Fetch categories dynamically using our reusable generic service with Next.js Cache
    const categories = await getCategories();

    // Fetch recent stories directly from database
    const recentData = await getStoriesDirect(undefined, 1, 4);
    const recent = recentData.stories.map(s => ({
        id: s._id.toString(),
        title: s.title,
        subtitle: new Date(s.createdAt).toLocaleDateString("hi-IN"),
        url: `/${s.slug}`
    }));

    // Fetch trending stories directly from database
    const trendingData = await getStoriesDirect(undefined, 2, 3);
    const moreLikeThis = trendingData.stories.length > 0
        ? trendingData.stories.map(s => ({
            id: s._id.toString(),
            title: s.title,
            subtitle: "🔥 ट्रेंडिंग",
            url: `/${s.slug}`
          }))
        : recentData.stories.slice(0, 3).map(s => ({
            id: s._id.toString(),
            title: s.title,
            subtitle: "🔥 ट्रेंडिंग",
            url: `/${s.slug}`
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
