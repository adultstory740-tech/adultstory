import mongoose, { Schema, model, models, Types } from "mongoose";
import { transliterateHindiToLatin } from "../lib/utils";

/**
 * =========================
 * BLOCK SCHEMA (Notion-style content)
 * =========================
 * हर story को छोटे blocks में store करेंगे
 * जैसे paragraph, heading, image, ad आदि
 */
export const BlockSchema = new Schema(
  {
    // Unique id for each block
    blockId: {
      type: String,
      default: () => new Types.ObjectId().toString(),
    },

    // Block type (क्या content है)
    type: {
      type: String,
      enum: ["heading", "paragraph", "image", "quote", "list", "ad"],
      required: true,
    },

    // Actual data (flexible structure)
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },

    // Block order (कौन सा पहले दिखेगा)
    order: Number,
  },
  { _id: false } // Subdocuments do not need their own primary _id here, we use blockId
);

/**
 * =========================
 * MAIN CONTENT SCHEMA (Stories)
 * =========================
 */
const ContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["story", "series", "episode"],
      default: "story",
    },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    coverImageAlt: String,
    
    // Using the BlockSchema array for structured content
    contentBlocks: {
      type: [BlockSchema],
      default: [],
    },
    
    episodes: [
      {
        type: Types.ObjectId,
        ref: "Content",
      },
    ],
    meta: {
      title: String,
      description: String,
      keywords: [String],
    },
    adConfig: {
      showTopAd: { type: Boolean, default: true },
      showMidAd: { type: Boolean, default: true },
      showBottomAd: { type: Boolean, default: true },
    },
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isAdult: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/**
 * AUTO SLUG GENERATION
 */
ContentSchema.pre("save", async function (this: any) {
  if (!this.slug && this.title) {
    this.slug = transliterateHindiToLatin(this.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

// Clear the Mongoose cache for this model during HMR to ensure new hooks are applied
if (models.Content) {
  delete models.Content;
}

const Content = model("Content", ContentSchema);

export default Content;
