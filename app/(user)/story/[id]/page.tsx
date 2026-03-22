import { stories } from "../../../../lib/mockData";
import { notFound } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const story = stories.find(s => s.id === parseInt(id));

    if (!story) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Content Area (Story Detail) */}
                <div className="lg:col-span-8">
                    <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
                        <div className="mb-6">
                            <span className="inline-block text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
                                {story.category}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                                {story.title}
                            </h1>
                            <p className="text-foreground/60 font-medium">प्रकाशित: {story.date}</p>
                        </div>
                        
                        <div className="text-lg text-foreground/90 leading-relaxed space-y-6 mt-8">
                            <p className="text-xl font-medium text-foreground/80 border-l-4 border-primary pl-4 tracking-wide italic bg-primary/5 p-4 rounded-r-lg">
                                {story.excerpt}
                            </p>
                            
                            <p>
                                यह कहानी अभी पूरी तरह से लिखी नहीं गई है। यह केवल एक डेमो है ताकि आप वेबसाइट का डिज़ाइन और लेआउट देख सकें। {story.title} जल्दी ही पढ़ने को मिलेगी!
                            </p>
                            <p>
                                इस जगह पर आपकी असल कहानी का लंबा कंटेंट आएगा जहाँ यूजर मज़े से कहानी पढ़ सकता है। इसमें और भी पैराग्राफ और दिलचस्प मोड़ जोड़े जा सकते हैं। आपका अनुभव शानदार हो इसके लिए यह वेबसाइट पूरी तरह तैयार है।
                            </p>
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
