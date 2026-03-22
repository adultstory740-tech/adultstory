import mongoose, { Schema, model, models } from "mongoose";

/**
 * =========================
 * CATEGORY SCHEMA
 * =========================
 * Example categories:
 * - desi
 * - college
 * - bhabhi
 */
const CategorySchema = new Schema(
  {
    // Category name (Admin panel में दिखेगा)
    name: {
      type: String,
      required: true,
      unique: true,
    },

    // URL slug (SEO friendly)
    // ex: desi-stories
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Short description (optional)
    description: String,

    // UI label (frontend display)
    uiLabel: String,

    // Navbar में दिखाना है या नहीं
    showInNavbar: {
      type: Boolean,
      default: true,
    },

    // Sorting priority (high → top)
    priority: {
      type: Number,
      default: 0,
    },

    // Active / inactive category
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Fallback to existing model or create new one (for Next.js HMR)
const Category = models.Category || model("Category", CategorySchema);

export default Category;
