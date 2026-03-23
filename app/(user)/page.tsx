import StoryGrid from "../../components/StoryGrid";
import Sidebar from "../../components/Sidebar";
import { StoryService } from "../../lib/api/stories";

export default async function Home() {
  // Fetch up to 20 latest stories globally (no category filter)
  const paginatedData = await StoryService.getStories(undefined, 1, 20);
  const latestStories = paginatedData.stories;

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
