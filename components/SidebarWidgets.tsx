import Link from "next/link";
import React from "react";

export interface SidebarStory {
    id: number | string;
    title: string;
    subtitle: string;
    url?: string;
}

interface SidebarStoryListProps {
    title: string;
    stories: SidebarStory[];
}

export function SidebarStoryList({ title, stories }: SidebarStoryListProps) {
    if (!stories?.length) return null;

    return (
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-primary border-b border-border pb-2">
                {title}
            </h3>
            <div className="space-y-4">
                {stories.map((story) => (
                    <div key={story.id} className="group cursor-pointer">
                        <Link href={story.url || "#"} className="block">
                            <h4 className="text-base font-semibold group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                                {story.title}
                            </h4>
                            <p className="text-sm text-foreground/60 mt-1 font-medium">{story.subtitle}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface SidebarCategoriesProps {
    title: string;
    categories: string[];
}

export function SidebarCategories({ title, categories }: SidebarCategoriesProps) {
    if (!categories?.length) return null;

    return (
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-primary border-b border-border pb-2">
                {title}
            </h3>
            <div className="grid grid-cols-2 gap-2">
                {categories.map((tag) => (
                    <Link 
                        key={tag} 
                        href={`/category/${tag}`}
                        className="text-xs sm:text-sm font-medium bg-secondary/50 border border-border/50 text-secondary-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors px-2 py-2.5 rounded-lg text-center shadow-sm"
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    );
}
