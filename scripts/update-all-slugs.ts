import mongoose from "mongoose";

const MONGODB_URI = "mongodb://StoryDb:StoryDb9580%40@ac-sylrhyq-shard-00-00.2ed297k.mongodb.net:27017,ac-sylrhyq-shard-00-01.2ed297k.mongodb.net:27017,ac-sylrhyq-shard-00-02.2ed297k.mongodb.net:27017/storydb?ssl=true&replicaSet=atlas-14xxlv-shard-0&authSource=admin&retryWrites=true&w=majority";

/**
 * Simple Hindi to Latin transliteration for slugs
 */
function transliterateHindiToLatin(text: string): string {
    const hindiMap: { [key: string]: string } = {
        'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
        'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'n',
        'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'n',
        'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
        'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
        'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
        'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
        'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', '्': '',
        'ं': 'n', 'ः': 'h', '़': '', 'ँ': 'n', '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
    };

    return text
        .split('')
        .map(char => hindiMap[char] || char)
        .join('');
}

function slugify(text: string): string {
    return transliterateHindiToLatin(text)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

async function updateSlugs() {
  try {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection failed");
    
    const contents = await db.collection("contents").find({}).toArray();
    
    console.log(`Found ${contents.length} stories to update.`);

    for (const story of contents) {
      const newSlug = slugify(story.title);
      console.log(`Updating "${story.title}" \n  -> ${newSlug}`);
      await db.collection("contents").updateOne(
        { _id: story._id },
        { $set: { slug: newSlug } }
      );
    }

    console.log("Finished updating slugs.");
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateSlugs();
