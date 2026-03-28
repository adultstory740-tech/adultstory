import mongoose from "mongoose";

const MONGODB_URI = ""
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
