import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Optimize the Mongoose query:
    // 1. Filter: Fetch only active categories that should be shown in the navbar.
    // 2. Select: Only return the required fields to minimize network payload.
    // 3. Sort: First by priority (highest first), then alphabetically by name.
    // 4. lean(): Bypass Mongoose document instantiation for better performance (returns plain JS objects).
    const categories = await Category.find({ isActive: true, showInNavbar: true })
      .select("_id name slug uiLabel priority showInNavbar")
      .sort({ priority: -1, name: 1 })
      .lean();

    return NextResponse.json(categories, {
      status: 200,
      headers: {
        // Cache the response at the edge/CDN for 1 hour, allowing stale data while revalidating.
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST endpoint for seeding/creating categories
export async function POST(request: Request) {
  try {
    await connectToDatabase();

    // The request body can be a single category object or an array of categories
    const body = await request.json();

    const categoriesToInsert = Array.isArray(body) ? body : [body];

    // Format the incoming data and provide default slugs if none are provided
    const formattedCategories = categoriesToInsert.map((cat: any) => {
      if (!cat.name) throw new Error("Category name is required.");
      
      const slug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      
      return {
        name: cat.name,
        slug: slug,
        uiLabel: cat.uiLabel || cat.name,
        showInNavbar: cat.showInNavbar !== undefined ? cat.showInNavbar : true,
        priority: cat.priority || 0,
        isActive: cat.isActive !== undefined ? cat.isActive : true,
      };
    });

    // Use insertMany for bulk insert, ignoring duplicates if we configure it or handling errors gracefully
    // To handle potential duplicates gracefully without failing the whole batch, we can use ordered: false
    const insertedCategories = await Category.insertMany(formattedCategories, { ordered: false })
      .catch((err) => {
        // If it's a duplicate key error, we can still return success for the ones that did insert
        if (err.code === 11000) {
          console.warn("Some categories were skipped because they already exist.");
          // return the ones that successfully inserted according to mongoose
          return err.insertedDocs || [];
        }
        throw err;
      });

    return NextResponse.json(
      { 
        message: "Categories successfully processed", 
        insertedCount: insertedCategories.length,
        categories: insertedCategories 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating categories:", error);
    return NextResponse.json(
      { error: "Failed to create categories", details: error.message },
      { status: 400 }
    );
  }
}
