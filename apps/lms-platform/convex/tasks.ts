// @ts-nocheck
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const toggleTask = mutation({
  args: { taskId: v.id("tasks"), completed: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, { completed: args.completed });
  },
});
