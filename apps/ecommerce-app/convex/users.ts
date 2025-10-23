// @ts-nocheck
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    passwordHash: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("ec_users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (existing) throw new Error("Email already registered");

    return await ctx.db.insert("ec_users", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ec_users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const getUser = query({
  args: { id: v.id("ec_users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateProfile = mutation({
  args: {
    userId: v.id("ec_users"),
    name: v.optional(v.string()),
    address: v.optional(v.object({
      line1: v.string(),
      line2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
      country: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(userId, filtered);
  },
});
