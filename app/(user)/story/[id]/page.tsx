export const dynamic = "force-dynamic";


import { notFound } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import { StoryService } from "../../../../lib/api/stories";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;

    // Fetch story dynamically using the cache
    const story = await StoryService.getStoryBySlug(id);

    if (!story) {
        return {
            title: "कहानी नहीं मिली | FreeSexKahani",
            description: "यह कहानी उपलब्ध नहीं है या हटा दी गई है।"
        };
    }

    const title = `${story.title} | FreeSexKahani`;
    const description = story.excerpt || "इस बेहतरीन कहानी को अभी पढ़ें और आनंद लें।";
    const keywords = story.tags ? story.tags.map(t => t.replace(/-/g, ' ')).join(", ") : "कहानी, story, reading";

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime: new Date(story.createdAt).toISOString(),
            tags: story.tags,
            siteName: "FreeSexKahani",
            url: `/story/${id}`,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        }
    };
}

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // id here is actually the slug

    // Fetch story dynamically
    const story = await StoryService.getStoryBySlug(id);

    if (!story) {
        notFound();
    }

    // Format date nicely
    const dateStr = new Date(story.createdAt).toLocaleDateString("hi-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Content Area (Story Detail) */}
                <div className="lg:col-span-8">
                    <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
                        <div className="mb-6">
                            {/* We can show tags or categories here instead of the raw category name */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {story.tags.slice(0, 2).map((tag, i) => (
                                    <span key={i} className="inline-block text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        {tag.replace(/-/g, ' ')}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                                {story.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-foreground/60 font-medium">
                                <span>प्रकाशित: {dateStr}</span>
                                <span>•</span>
                                <span>👁 {story.views || 0} Views</span>
                            </div>
                        </div>

                        <div className="text-lg text-foreground/90 leading-relaxed space-y-6 mt-8">
                            {/* First paragraph logic for excerpt/highlight */}
                            {story.contentBlocks && story.contentBlocks.length > 0 ? (
                                story.contentBlocks.map((block: any) => {
                                    if (block.type === 'paragraph') {
                                        return (
                                            <p key={block.blockId || Math.random()} className="mb-4">
                                                {block.data}
                                            </p>
                                        );
                                    }
                                    if (block.type === 'heading') {
                                        return (
                                            <h2 key={block.blockId || Math.random()} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                                                {block.data}
                                            </h2>
                                        );
                                    }
                                    return null;
                                })
                            ) : (
                                <>
                                    <p className="text-xl font-medium text-foreground/80 border-l-4 border-primary pl-4 tracking-wide italic bg-primary/5 p-4 rounded-r-lg">
                                        {story.excerpt}
                                    </p>
                                    <p>No content blocks found for this story.</p>
                                </>
                            )}
                        </div>

                        <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2 items-center">
                            <span className="text-sm font-bold text-foreground/70 flex items-center">टैग्स:</span>
                            {story.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-secondary/80 border border-border/50 px-3 py-1.5 rounded-full text-secondary-foreground font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content Area (Sidebar) */}
                <div className="lg:col-span-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
