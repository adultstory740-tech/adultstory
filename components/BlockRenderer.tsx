"use client";

import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
// import { Copy, Share2, Check } from "lucide-react";


/* ============================
   TYPES (Schema-aligned)
============================ */

type BlockType =
    | "heading"
    | "paragraph"
    | "image"
    | "quote"
    | "list"
    | "timeline"
    | "embed"
    | "factBox"
    | "shayari"
    | "link";

interface BlockData {
    text?: string;
    level?: number;
    file?: { url: string };
    src?: string; // Backwards compatibility / Direct src
    alt?: string;
    caption?: string;
    items?: string[];
    style?: "ordered" | "unordered";
    withBackground?: boolean;

    // timeline
    events?: { date?: string; title: string; description?: string }[];

    // embed
    url?: string;

    // factBox
    facts?: (string | { label: string; value: string })[];

    // link
    description?: string; // Context text before/around the link
}

interface Block {
    blockId?: string;
    type: BlockType;
    data: BlockData;
}

interface BlockRendererProps {
    blocks: Block[];
    className?: string;
}

/* ============================
   BLOCK COMPONENTS
============================ */

const HeadingBlock = React.memo(({ data }: { data: BlockData }) => {
    const level = data.level ?? 2;
    const Tag = (level === 1 ? "h1" : level === 3 ? "h3" : "h2") as keyof React.JSX.IntrinsicElements;

    const classes: Record<string, string> = {
        h1: "text-3xl md:text-4xl font-extrabold mt-10 mb-5 text-gray-900",
        h2: "text-2xl md:text-3xl font-bold mt-10 mb-4 border-l-4 border-red-600 pl-4",
        h3: "text-xl md:text-2xl font-semibold mt-8 mb-3 text-gray-800",
    };

    return <Tag className={classes[Tag]}>{data.text}</Tag>;
});

const ParagraphBlock = React.memo(({ data }: { data: BlockData }) => (
    <p
        className="text-[1.05rem] md:text-lg leading-relaxed text-gray-800 mb-6"
        dangerouslySetInnerHTML={{ __html: data.text || "" }}
    />
));

const ImageBlock = React.memo(({ data }: { data: BlockData }) => {
    const imageUrl = data.file?.url || data.src;
    const imageAlt = data.alt || data.caption || "News image";

    if (!imageUrl) return null;

    return (
        <figure className="my-8">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    priority={false}
                    sizes="(max-width:768px) 100vw, 75vw"
                    className="object-cover"
                />
            </div>
            {data.caption && (
                <figcaption className="text-sm text-center text-gray-500 mt-2">
                    {data.caption}
                </figcaption>
            )}
        </figure>
    );
});

const QuoteBlock = React.memo(({ data }: { data: BlockData }) => (
    <blockquote className="my-8 p-6 bg-gray-50 border-l-4 border-red-600 rounded">
        <p
            className="text-xl italic text-gray-900 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `“${data.text}”` }}
        />
        {data.caption && (
            <footer className="mt-3 text-sm font-medium text-red-600">
                — {data.caption}
            </footer>
        )}
    </blockquote>
));

const ListBlock = React.memo(({ data }: { data: BlockData }) => {
    const Tag = data.style === "ordered" ? "ol" : "ul";
    return (
        <Tag
            className={cn(
                "my-6 pl-6 space-y-2",
                data.style === "ordered" ? "list-decimal" : "list-disc"
            )}
        >
            {data.items?.map((item, i) => (
                <li key={i} className="text-lg text-gray-800">
                    {item}
                </li>
            ))}
        </Tag>
    );
});

/* ============================
   NEW BLOCKS (Schema-safe)
============================ */

const TimelineBlock = ({ data }: { data: BlockData }) => {
    if (!data.events?.length) return null;

    return (
        <div className="my-10 space-y-6 border-l-2 border-gray-200 pl-6">
            {data.events.map((e, i) => (
                <div key={i}>
                    {e.date && (
                        <div className="text-sm text-red-600 font-medium">{e.date}</div>
                    )}
                    <h4 className="text-lg font-semibold">{e.title}</h4>
                    {e.description && (
                        <p className="text-gray-700 mt-1">{e.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

const EmbedBlock = ({ data }: { data: BlockData }) => {
    if (!data.url) return null;

    return (
        <div className="my-8 aspect-video w-full">
            <iframe
                src={data.url}
                loading="lazy"
                className="w-full h-full rounded-lg border"
                allowFullScreen
            />
        </div>
    );
};

const FactBoxBlock = ({ data }: { data: BlockData & { title?: string; facts?: (string | { label: string; value: string })[] } }) => {
    if (!data.facts?.length) return null;

    return (
        <aside className="my-6 md:my-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-yellow-900 flex items-center gap-2">
                <span>📌</span> {data.title || "तथ्य संक्षेप"}
            </h3>
            <ul className="space-y-3 md:space-y-2">
                {data.facts.map((fact, i) => {
                    let label = "";
                    let value = "";

                    if (typeof fact === "string") {
                        const parts = fact.split(":");
                        label = parts[0]?.trim();
                        value = parts.slice(1).join(":")?.trim();
                    } else {
                        label = fact.label;
                        value = fact.value;
                    }

                    return (
                        <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 text-sm md:text-base border-b border-yellow-100 last:border-0 pb-2 last:pb-0 sm:border-0 sm:pb-0">
                            <span className="font-semibold text-gray-800 sm:min-w-[140px]">{label}</span>
                            <span className="text-gray-900 text-left sm:text-right leading-relaxed">{value}</span>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

// const ShayariBlock = ({ data }: { data: BlockData }) => {
//     const [copied, setCopied] = useState(false);

//     const handleCopy = async () => {
//         if (!data.text) return;

//         // Modern Clipboard API
//         if (navigator.clipboard) {
//             try {
//                 await navigator.clipboard.writeText(data.text);
//                 setCopied(true);
//                 setTimeout(() => setCopied(false), 2000);
//                 return;
//             } catch (err) {
//                 console.error("Clipboard API failed:", err);
//             }
//         }

//         // Fallback for older browsers
//         try {
//             const textArea = document.createElement("textarea");
//             textArea.value = data.text;
//             textArea.style.position = "fixed";
//             textArea.style.left = "-9999px";
//             document.body.appendChild(textArea);
//             textArea.focus();
//             textArea.select();
//             document.execCommand("copy");
//             document.body.removeChild(textArea);
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//         } catch (err) {
//             console.error("Fallback copy failed:", err);
//         }
//     };

//     return (
//         <div className="my-8 relative group">
//             <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
//             <div className="relative bg-white dark:bg-zinc-900 border-t-4 border-pink-500 rounded-lg shadow-xl p-6 md:p-8">
//                 <div className="absolute top-0 right-0 p-4 flex gap-2 z-10">
//                     <button
//                         onClick={handleCopy}
//                         className="flex items-center gap-1 px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded-md text-sm"
//                     >
//                         {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//                         {copied ? "Copied!" : "Copy"}
//                     </button>
//                 </div>

//                 <div className="text-center space-y-4">
//                     <div className="text-4xl text-pink-200 font-serif leading-none select-none">❝</div>

//                     <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed font-serif whitespace-pre-line px-2 md:px-4">
//                         {data.text}
//                     </p>

//                     <div className="text-4xl text-pink-200 font-serif leading-none select-none">❞</div>
//                 </div>

//                 {data.caption && (
//                     <div className="mt-6 text-center text-sm font-semibold text-pink-600 uppercase tracking-wider">
//                         — {data.caption}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };


const LinkBlock = ({ data }: { data: BlockData }) => {
    if (!data.url || !data.text) return null;

    return (
        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
                <span className="text-2xl pt-1">🔗</span>
                <div className="flex flex-col gap-1">
                    {data.description && (
                        <p className="text-gray-700 font-medium leading-snug">
                            {data.description}
                        </p>
                    )}
                    <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 font-bold hover:underline hover:text-blue-800 break-words"
                    >
                        {data.text}
                    </a>
                </div>
            </div>
        </div>
    );
};


/* ============================
   MAIN RENDERER
============================ */

export default function BlockRenderer({
    blocks,
    className,
}: BlockRendererProps) {
    if (!blocks?.length) return null;

    return (
        <article
            className={cn(
                "max-w-none text-base prose-headings:scroll-mt-24",
                className
            )}
        >
            {blocks.map((block) => {
                switch (block.type) {
                    case "heading":
                        return <HeadingBlock key={block.blockId} data={block.data} />;
                    case "paragraph":
                        return <ParagraphBlock key={block.blockId} data={block.data} />;
                    case "image":
                        return <ImageBlock key={block.blockId} data={block.data} />;
                    case "quote":
                        return <QuoteBlock key={block.blockId} data={block.data} />;
                    case "list":
                        return <ListBlock key={block.blockId} data={block.data} />;
                    case "timeline":
                        return <TimelineBlock key={block.blockId} data={block.data} />;
                    case "embed":
                        return <EmbedBlock key={block.blockId} data={block.data} />;
                    case "factBox":
                        return <FactBoxBlock key={block.blockId} data={block.data} />;
                    // case "shayari":
                    //     return <ShayariBlock key={block.blockId} data={block.data} />;
                    case "link":
                        return <LinkBlock key={block.blockId} data={block.data} />;
                    default:
                        return null;
                }
            })}
        </article>
    );
}
