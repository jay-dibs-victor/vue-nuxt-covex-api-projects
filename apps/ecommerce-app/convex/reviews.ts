// @ts-nocheck
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProductReviews = query({
  args: { productId: v.id("ec_products") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ec_reviews")
      .withIndex("by_product", (q) => q.eq("productId", args.productId))
      .order("desc")
      .collect();
  },
});

export const addReview = mutation({
  args: {
    productId: v.id("ec_products"),
    userId: v.optional(v.string()),
    reviewerName: v.string(),
    rating: v.number(),
    title: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const reviewId = await ctx.db.insert("ec_reviews", {
      ...args,
      createdAt: Date.now(),
    });

    // Recompute product average rating
    const allReviews = await ctx.db
      .query("ec_reviews")
      .withIndex("by_product", (q) => q.eq("productId", args.productId))
      .collect();

    const avg =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await ctx.db.patch(args.productId, {
      rating: parseFloat(avg.toFixed(1)),
      reviewCount: allReviews.length,
    });

    return reviewId;
  },
});
