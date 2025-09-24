import { query } from "./_generated/server";
import { v } from "convex/values";

export const getByCourseId = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courseModules")
      .filter((q) => q.eq(q.field("courseId"), args.courseId))
      .collect();
  },
});
