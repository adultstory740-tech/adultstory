import Link from "next/link";
import React from "react";

const RECENT_STORIES = [
    { id: 101, title: "बॉयफ्रेंड के साथ पहली रात का रोमांच", time: "2 घंटे पहले" },
    { id: 102, title: "लॉक्ड ऑफिस में कलीग के साथ", time: "5 घंटे पहले" },
    { id: 103, title: "पड़ोसन की नजर", time: "कल" },
    { id: 104, title: "जिम ट्रेनर का राज", time: "कल" },
];

const MORE_LIKE_THIS = [
    { id: 201, title: "साली ने किया जीजा को इम्प्रेस", views: "12k views" },
    { id: 202, title: "देवर भाभी की छुप-छुप के बातें", views: "8.5k views" },
    { id: 203, title: "कॉलेज ट्रिप पर दोस्तों के मजे", views: "15k views" },
];

export default function Sidebar() {
    return (
        <aside className="w-full flex flex-col gap-8">
            {/* Recently Posted */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-primary border-b border-border pb-2">
                    हाल ही में प्रकाशित
                </h3>
                <div className="space-y-4">
                    {RECENT_STORIES.map((story) => (
                        <div key={story.id} className="group cursor-pointer">
                            <h4 className="text-base font-semibold group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                                {story.title}
                            </h4>
                            <p className="text-sm text-foreground/60 mt-1 font-medium">{story.time}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* More Like This */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-primary border-b border-border pb-2">
                    ऐसी और कहानियां
                </h3>
                <div className="space-y-4">
                    {MORE_LIKE_THIS.map((story) => (
                        <div key={story.id} className="group cursor-pointer">
                            <h4 className="text-base font-semibold group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                                {story.title}
                            </h4>
                            <p className="text-sm text-foreground/60 mt-1 font-medium">{story.views}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories Tags */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-primary border-b border-border pb-2">
                    लोकप्रिय श्रेणियां
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {["साली की स्टोरी", "भाभी", "पड़ोसी", "रोमांटिक", "हॉट", "देवर", "कॉलेज", "सुहागरात"].map((tag) => (
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
        </aside>
    );
}
