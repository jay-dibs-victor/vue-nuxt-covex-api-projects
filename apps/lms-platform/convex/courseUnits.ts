import { query } from "./_generated/server";
import { v } from "convex/values";

export const getByModuleId = query({
  args: { moduleId: v.id("lms_modules") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lms_units")
      .filter((q) => q.eq(q.field("moduleId"), args.moduleId))
      .collect();
  },
});
