import React from "react";
import { SidebarStoryList, SidebarCategories } from "./SidebarWidgets";
import { CATEGORIES, getLatestStories, stories } from "../lib/mockData";

export default function Sidebar() {
    const recent = getLatestStories(4).map(s => ({
        id: s.id.toString(),
        title: s.title,
        subtitle: s.date,
        url: `/story/${s.id}`
    }));

    const moreLikeThis = stories.slice(10, 13).map(s => ({
        id: s.id.toString(),
        title: s.title,
        subtitle: "🔥 ट्रेंडिंग",
        url: `/story/${s.id}`
    }));

    const popularCategories = CATEGORIES.filter(c => c.slug !== "latest");

    return (
        <aside className="w-full flex flex-col gap-8">
            <SidebarStoryList title="हाल ही में प्रकाशित" stories={recent} />
            <SidebarStoryList title="ऐसी और कहानियां" stories={moreLikeThis} />
            <SidebarCategories title="लोकप्रिय श्रेणियां" categories={popularCategories} />
        </aside>
    );
}
