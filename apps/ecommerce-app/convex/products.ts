// @ts-nocheck
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listProducts = query({
  args: {
    category: v.optional(v.string()),
    gender: v.optional(v.string()),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    sortBy: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    isNew: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let products = await ctx.db.query("ec_products").collect();

    if (args.category) {
      products = products.filter((p) => p.category === args.category);
    }
    if (args.gender) {
      products = products.filter(
        (p) => p.gender === args.gender || p.gender === "unisex"
      );
    }
    if (args.minPrice !== undefined) {
      products = products.filter((p) => p.price >= args.minPrice!);
    }
    if (args.maxPrice !== undefined) {
      products = products.filter((p) => p.price <= args.maxPrice!);
    }
    if (args.featured !== undefined) {
      products = products.filter((p) => p.featured === args.featured);
    }
    if (args.isNew !== undefined) {
      products = products.filter((p) => p.isNew === args.isNew);
    }

    if (args.sortBy === "price_asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (args.sortBy === "price_desc") {
      products.sort((a, b) => b.price - a.price);
    } else if (args.sortBy === "rating") {
      products.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (args.sortBy === "newest") {
      products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return products;
  },
});

export const getProduct = query({
  args: { id: v.id("ec_products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getProductBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ec_products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getFeaturedProducts = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("ec_products").collect();
    return all.filter((p) => p.featured).slice(0, 6);
  },
});

export const getNewArrivals = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("ec_products").collect();
    return all.filter((p) => p.isNew).slice(0, 8);
  },
});

export const updateProductRating = mutation({
  args: { productId: v.id("ec_products"), rating: v.number(), reviewCount: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.productId, {
      rating: args.rating,
      reviewCount: args.reviewCount,
    });
  },
});
