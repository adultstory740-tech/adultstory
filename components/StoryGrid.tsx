import React from "react";
import StoryCard, { Story } from "./StoryCard";

interface StoryGridProps {
    title: string;
    stories: Story[];
}

export default function StoryGrid({ title, stories }: StoryGridProps) {
    if (!stories?.length) return null;

    return (
        <div className="w-full">
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-primary border-b border-border pb-3">
                {title}
            </h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {stories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>
    );
}
