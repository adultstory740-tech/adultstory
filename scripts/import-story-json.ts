/**
 * Import a story from JSON (file path as first CLI arg).
 * Use for blocks that match Content schema — same shapes as POST /api/stories.
 *
 * Example: npx tsx scripts/import-story-json.ts ./my-story.json
 *
 * JSON shape (contentBlocks OR content):
 * {
 *   "categorySlug": "bhabhi",
 *   "title": "शीर्षक",
 *   "slug": "optional-custom-slug",
 *   "excerpt": "संक्षिप्त विवरण",
 *   "meta": { "title": "", "description": "", "keywords": [] },
 *   "tags": ["tag1", "tag2"],
 *   "published": true,
 *   "content": "पैरा एक\n\nपैरा दो",
 *   "contentBlocks": [ { "type": "paragraph", "data": "<p>HTML</p>", "order": 0 } ]
 * }
 */

import fs from "fs";
import path from "path";
import connectToDatabase from "../lib/mongodb";
import Content from "../models/Content";
import Category from "../models/Category";

function blocksFromPlainText(content: string) {
  const rawBlocks = content.split(/\n\s*\n/).filter((b: string) => b.trim().length > 0);
  return rawBlocks.map((text: string, index: number) => ({
    type: "paragraph" as const,
    data: text.trim(),
    order: index,
  }));
}

async function main() {
  const fileArg = process.argv[2];
  if (!fileArg) {
    console.error("Usage: npx tsx scripts/import-story-json.ts <path-to-story.json>");
    process.exit(1);
  }

  const abs = path.isAbsolute(fileArg) ? fileArg : path.join(process.cwd(), fileArg);
  if (!fs.existsSync(abs)) {
    console.error("File not found:", abs);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(abs, "utf8")) as {
    categorySlug: string;
    title: string;
    slug?: string;
    excerpt: string;
    meta?: { title?: string; description?: string; keywords?: string[] };
    tags?: string[];
    published?: boolean;
    isAdult?: boolean;
    content?: string;
    contentBlocks?: { type: string; data: unknown; order?: number }[];
  };

  if (!raw.categorySlug || !raw.title || !raw.excerpt) {
    console.error("categorySlug, title, and excerpt are required.");
    process.exit(1);
  }

  await connectToDatabase();

  const cat = await Category.findOne({ slug: raw.categorySlug });
  if (!cat) {
    console.error(`No category with slug "${raw.categorySlug}". Create it first or fix categorySlug.`);
    process.exit(1);
  }

  let contentBlocks = raw.contentBlocks;
  if (!contentBlocks?.length) {
    if (!raw.content?.trim()) {
      console.error("Provide either contentBlocks[] or content (plain text with blank lines between paragraphs).");
      process.exit(1);
    }
    contentBlocks = blocksFromPlainText(raw.content);
  }

  const doc = new Content({
    title: raw.title,
    slug: raw.slug?.trim().toLowerCase() || undefined,
    excerpt: raw.excerpt,
    categoryId: cat._id,
    tags: raw.tags?.length ? raw.tags : [raw.categorySlug],
    contentBlocks,
    type: "story",
    published: raw.published !== false,
    isAdult: raw.isAdult !== false,
    meta: raw.meta,
  });

  await doc.save();
  console.log("Saved story:", { _id: String(doc._id), slug: doc.slug });
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
