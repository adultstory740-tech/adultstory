import Link from "next/link";
import React from "react";
import { Story } from "../lib/api/stories"; // Import our generic Story type

interface StoryCardProps {
    story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
    // Format date nicely
    const dateStr = new Date(story.createdAt).toLocaleDateString("hi-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="group bg-card backdrop-blur rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between border border-border">
            <div>
                <Link href={`/story/${story.slug || story._id}`} className="block">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-foreground line-clamp-2">
                        {story.title}
                    </h3>
                </Link>
                <p className="text-foreground/70 mb-4 line-clamp-3 text-sm flex-grow">
                    {story.excerpt}
                </p>
                {story.tags && story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {story.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded">
                                {tag.replace(/-/g, ' ')}
                            </span>
                        ))}
                    </div>
                )}
                <div className="flex items-center justify-between text-xs text-foreground/50 font-medium">
                    <span className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {dateStr}
                    </span>
                    <span className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1 rounded-md text-primary">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.252.477-4.5 1.253"></path>
                        </svg>
                        {story.views || 0} Views
                    </span>
                </div>
            </div>
            <Link href={`/story/${story.slug || story._id}`} className="mt-6 block w-full text-center text-base font-semibold bg-primary text-primary-foreground py-2.5 rounded-xl hover:scale-[1.02] active:scale-95 transition shadow-sm hover:shadow">
                पढ़ें →
            </Link>
        </div>
    );
}
