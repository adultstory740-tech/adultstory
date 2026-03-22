import StoryGrid from "../../components/StoryGrid";
import Sidebar from "../../components/Sidebar";
import { getLatestStories } from "../../lib/mockData";

export default function Home() {
  const latestStories = getLatestStories(20);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Content Area (Stories) */}
        <div className="lg:col-span-8">
          <StoryGrid title="📚 ताज़ा कहानियां (Top 20)" stories={latestStories} />
        </div>

        {/* Right Content Area (Sidebar) */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
