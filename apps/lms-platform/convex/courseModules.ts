import { query } from "./_generated/server";
import { v } from "convex/values";

export const getByCourseId = query({
  args: { courseId: v.id("lms_courses") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lms_modules")
      .filter((q) => q.eq(q.field("courseId"), args.courseId))
      .collect();
  },
});
