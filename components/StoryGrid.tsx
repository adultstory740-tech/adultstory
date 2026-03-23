import React from "react";
import StoryCard from "./StoryCard";
import { Story } from "../lib/api/stories";

interface StoryGridProps {
    title: string;
    stories: Story[];
}

export default function StoryGrid({ title, stories }: StoryGridProps) {
    if (!stories || stories.length === 0) {
        return (
            <div className="w-full">
                <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-primary border-b border-border pb-3">
                    {title}
                </h1>
                <div className="bg-card border border-border rounded-xl p-10 text-center text-foreground/70 shadow flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-foreground/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.252.477-4.5 1.253" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">कोई कहानी नहीं मिली</h3>
                    <p className="text-sm">अभी तक वेबसाइट पर कोई कहानी प्रकाशित नहीं की गई है। कृपया बाद में चेक करें।</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-primary border-b border-border pb-3">
                {title}
            </h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {stories.map((story) => (
                    <StoryCard key={story._id} story={story} />
                ))}
            </div>
        </div>
    );
}
