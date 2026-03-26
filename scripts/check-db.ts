import mongoose from "mongoose";

const MONGODB_URI = "mongodb://StoryDb:StoryDb9580%40@ac-sylrhyq-shard-00-00.2ed297k.mongodb.net:27017,ac-sylrhyq-shard-00-01.2ed297k.mongodb.net:27017,ac-sylrhyq-shard-00-02.2ed297k.mongodb.net:27017/storydb?ssl=true&replicaSet=atlas-14xxlv-shard-0&authSource=admin&retryWrites=true&w=majority";

async function checkStories() {
  try {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection not established");
    }
    const contents = await db.collection("contents").find({}, { projection: { title: 1, slug: 1 } }).limit(10).toArray();
    console.log(JSON.stringify(contents, null, 2));
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkStories();
