
import mongoose from "mongoose";
import connectToDatabase from "../lib/mongodb";
import Content from "../models/Content";
import Category from "../models/Category";

async function checkData() {
    try {
        await connectToDatabase();
        console.log("Connected to database.");

        const storyCount = await Content.countDocuments({ type: "story" });
        console.log(`Total stories: ${storyCount}`);

        const publishedStoryCount = await Content.countDocuments({ type: "story", published: true });
        console.log(`Published stories: ${publishedStoryCount}`);

        const categories = await Category.find({});
        console.log(`Total categories: ${categories.length}`);

        for (const cat of categories) {
            const countByCategoryId = await Content.countDocuments({ categoryId: cat._id, published: true });
            const countByTag = await Content.countDocuments({ tags: cat.slug, published: true });
            console.log(`Category: ${cat.name} (slug: ${cat.slug}, id: ${cat._id})`);
            console.log(`  - Stories by categoryId: ${countByCategoryId}`);
            console.log(`  - Stories by tags: ${countByTag}`);
        }

        process.exit(0);
    } catch (error) {
        console.error("Error checking data:", error);
        process.exit(1);
    }
}

checkData();
