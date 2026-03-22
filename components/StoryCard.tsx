import React from "react";
import Link from "next/link";

export interface Story {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    category: string;
    tags: string[];
}

interface StoryCardProps {
    story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
    return (
        <div className="group bg-card backdrop-blur rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between border border-border">
            <div>
                <Link href={`/story/${story.id}`}>
                    <h2 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition line-clamp-2 text-foreground">
                        {story.title}
                    </h2>
                </Link>

                <p className="text-sm text-foreground/60 mb-3 font-medium">
                    {story.date}
                </p>

                <p className="text-base text-foreground/80 leading-relaxed line-clamp-3">
                    {story.excerpt}
                </p>
            </div>

            <div className="mt-5">
                <span className="inline-block text-xs font-semibold bg-accent/20 text-accent-foreground px-2.5 py-1 rounded-md">
                    {story.category}
                </span>

                <div className="mt-3 flex flex-wrap gap-2">
                    {story.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs bg-secondary px-2.5 py-1 rounded-md text-secondary-foreground font-medium"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <Link href={`/story/${story.id}`} className="mt-6 block w-full text-center text-base font-semibold bg-primary text-primary-foreground py-2.5 rounded-xl hover:scale-[1.02] active:scale-95 transition shadow-sm hover:shadow">
                पढ़ें →
            </Link>
        </div>
    );
}
