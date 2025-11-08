import { query } from "./_generated/server";
import { v } from "convex/values";

export const getByModuleId = query({
  args: { moduleId: v.optional(v.id("lms_modules")) },
  handler: async (ctx, args) => {
    if (!args.moduleId) return [];
    return await ctx.db
      .query("lms_units")
      .filter((q) => q.eq(q.field("moduleId"), args.moduleId))
      .collect();
  },
});
