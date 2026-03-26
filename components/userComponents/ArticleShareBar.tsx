"use client";

import React from "react";
import { 
    FaFacebookF, 
    FaTwitter, 
    FaWhatsapp, 
    FaLink,
    FaEnvelope
} from "react-icons/fa";

interface ArticleShareBarProps {
    title: string;
}

export default function ArticleShareBar({ title }: ArticleShareBarProps) {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    const shareLinks = [
        {
            name: "WhatsApp",
            icon: FaWhatsapp,
            color: "bg-[#25D366]",
            hover: "hover:bg-[#128C7E]",
            href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + shareUrl)}`
        },
        {
            name: "Facebook",
            icon: FaFacebookF,
            color: "bg-[#1877F2]",
            hover: "hover:bg-[#05479E]",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        },
        {
            name: "Twitter",
            icon: FaTwitter,
            color: "bg-[#1DA1F2]",
            hover: "hover:bg-[#0C85D0]",
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
        },
        {
            name: "Email",
            icon: FaEnvelope,
            color: "bg-gray-600",
            hover: "hover:bg-gray-700",
            href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`
        }
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Share</span>
            <div className="flex gap-2">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${link.color} ${link.hover} text-white p-2 rounded-full transition-colors flex items-center justify-center`}
                        title={`Share on ${link.name}`}
                    >
                        <link.icon size={14} />
                    </a>
                ))}
                <button
                    onClick={copyToClipboard}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-full transition-colors flex items-center justify-center"
                    title="Copy Link"
                >
                    <FaLink size={14} />
                </button>
            </div>
        </div>
    );
}
