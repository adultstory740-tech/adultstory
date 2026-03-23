import Link from "next/link";
import React from "react";
import { getCategories } from "../lib/api/categories";

export default async function Navbar() {
    // Fetch categories dynamically using our reusable generic service with cache
    const categories = await getCategories();

    return (
        <nav className="bg-card text-card-foreground border-b border-border sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-2xl font-extrabold text-primary tracking-tight">
                        FreeSexKahani
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6 ml-10 overflow-x-auto">
                    <Link
                        href="/"
                        className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
                    >
                        सभी कहानियाँ
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat._id || cat.slug}
                            href={`/category/${cat.slug}`}
                            className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
                        >
                            {cat.uiLabel || cat.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Horizontal Scroll Menu */}
            <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur">
                <div className="flex overflow-x-auto hide-scrollbar py-2.5 px-4 gap-4 items-center">
                    <Link
                        href="/"
                        className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap px-3 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                    >
                        सभी कहानियाँ
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat._id || cat.slug}
                            href={`/category/${cat.slug}`}
                            className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap px-3 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                        >
                            {cat.uiLabel || cat.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
