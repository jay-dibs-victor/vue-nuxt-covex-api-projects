import { query } from "./_generated/server";
import { v } from "convex/values";

export const getByModuleId = query({
  args: { moduleId: v.id("courseModules") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courseUnits")
      .filter((q) => q.eq(q.field("moduleId"), args.moduleId))
      .collect();
  },
});
