import React from "react";
import Image from "next/image";

interface Block {
    type: string;
    data: any;
    blockId?: string;
}

interface BlockRendererProps {
    blocks: Block[];
}

/** Matches API/seed (string) and admin BlockRenderer shape ({ text }) */
function paragraphHtml(data: unknown): string {
    if (data == null) return "";
    if (typeof data === "string") return data;
    if (typeof data === "object" && data !== null && "text" in data) {
        const t = (data as { text?: unknown }).text;
        return typeof t === "string" ? t : "";
    }
    return "";
}

function headingText(data: unknown): string {
    if (typeof data === "string") return data;
    if (typeof data === "object" && data !== null && "text" in data) {
        const t = (data as { text?: unknown }).text;
        return typeof t === "string" ? t : "";
    }
    return String(data ?? "");
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className="space-y-6">
            {blocks.map((block, index) => {
                const key = block.blockId || index;

                switch (block.type) {
                    case "paragraph":
                        return (
                            <p key={key} className="text-gray-800 leading-relaxed text-lg" 
                               dangerouslySetInnerHTML={{ __html: paragraphHtml(block.data) }} />
                        );
                    case "heading":
                        return (
                            <h2 key={key} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                                {headingText(block.data)}
                            </h2>
                        );
                    case "image":
                        return (
                            <figure key={key} className="my-8">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                                    <Image
                                        src={block.data?.url || block.data?.src}
                                        alt={block.data?.caption || "Story image"}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {block.data?.caption && (
                                    <figcaption className="text-center text-sm text-gray-500 mt-2">
                                        {block.data.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );
                    case "list":
                        const ListTag = block.data?.style === "ordered" ? "ol" : "ul";
                        return (
                            <ListTag key={key} className={`pl-6 ${block.data?.style === "ordered" ? "list-decimal" : "list-disc"} space-y-2`}>
                                {block.data?.items?.map((item: string, i: number) => (
                                    <li key={i} className="text-gray-800 text-lg">{item}</li>
                                ))}
                            </ListTag>
                        );
                    case "quote": {
                        const q =
                            typeof block.data === "string"
                                ? { body: block.data, caption: undefined as string | undefined }
                                : {
                                      body: paragraphHtml(block.data),
                                      caption: block.data?.caption as string | undefined,
                                  };
                        return (
                            <blockquote key={key} className="border-l-4 border-red-600 pl-4 italic text-xl text-gray-700 my-6">
                                <span dangerouslySetInnerHTML={{ __html: q.body }} />
                                {q.caption && (
                                    <footer className="text-sm mt-2 text-gray-500 not-italic">— {q.caption}</footer>
                                )}
                            </blockquote>
                        );
                    }
                    default:
                        return null;
                }
            })}
        </div>
    );
}
