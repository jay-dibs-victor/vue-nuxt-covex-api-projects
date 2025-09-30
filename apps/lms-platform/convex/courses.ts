// @ts-nocheck
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCourses = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("lms_courses").collect();
  },
});

export const getById = query({
  args: { id: v.id("lms_courses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateProgress = mutation({
  args: { courseId: v.id("lms_courses"), progress: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.courseId, { progress: args.progress });
  },
});
