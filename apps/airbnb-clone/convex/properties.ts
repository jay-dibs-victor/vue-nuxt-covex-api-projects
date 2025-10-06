import { query } from "./_generated/server";
import { v } from "convex/values";

export const getProperties = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const category = args.category;
    if (category && category !== "All") {
      return await ctx.db
        .query("properties")
        .withIndex("by_category", (q) => q.eq("category", category))
        .collect();
    }
    return await ctx.db.query("properties").collect();
  },
});

export const getById = query({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
