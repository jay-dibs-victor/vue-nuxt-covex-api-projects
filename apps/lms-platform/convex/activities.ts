import { query } from "./_generated/server";

export const getActivities = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("lms_activities").collect();
  },
});
