import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const signup = mutation({
  args: { 
    name: v.string(), 
    email: v.string(),
    avatar: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    
    if (existing) {
      throw new Error("User with this email already exists");
    }

    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      avatar: args.avatar || `https://i.pravatar.cc/150?u=${args.email}`,
    });

    return userId;
  },
});

export const login = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
});

export const me = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) return null;
    return await ctx.db.get(args.userId);
  },
});
