import React from "react";
import { SidebarStoryList, SidebarCategories, SidebarStory } from "./SidebarWidgets";

const RECENT_STORIES: SidebarStory[] = [
    { id: 101, title: "बॉयफ्रेंड के साथ पहली रात का रोमांच", subtitle: "2 घंटे पहले", url: "/story/101" },
    { id: 102, title: "लॉक्ड ऑफिस में कलीग के साथ", subtitle: "5 घंटे पहले", url: "/story/102" },
    { id: 103, title: "पड़ोसन की नजर", subtitle: "कल", url: "/story/103" },
    { id: 104, title: "जिम ट्रेनर का राज", subtitle: "कल", url: "/story/104" },
];

const MORE_LIKE_THIS: SidebarStory[] = [
    { id: 201, title: "साली ने किया जीजा को इम्प्रेस", subtitle: "12k views", url: "/story/201" },
    { id: 202, title: "देवर भाभी की छुप-छुप के बातें", subtitle: "8.5k views", url: "/story/202" },
    { id: 203, title: "कॉलेज ट्रिप पर दोस्तों के मजे", subtitle: "15k views", url: "/story/203" },
];

const POPULAR_CATEGORIES = [
    "साली की स्टोरी", "भाभी", "पड़ोसी", "रोमांटिक", "हॉट", "देवर", "कॉलेज", "सुहागरात"
];

export default function Sidebar() {
    return (
        <aside className="w-full flex flex-col gap-8">
            <SidebarStoryList title="हाल ही में प्रकाशित" stories={RECENT_STORIES} />
            <SidebarStoryList title="ऐसी और कहानियां" stories={MORE_LIKE_THIS} />
            <SidebarCategories title="लोकप्रिय श्रेणियां" categories={POPULAR_CATEGORIES} />
        </aside>
    );
}
