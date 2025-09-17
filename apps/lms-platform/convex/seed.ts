// @ts-nocheck
import { mutation } from "./_generated/server";

export default mutation({
  handler: async (ctx) => {
    // Check if courses already exist
    const existing = await ctx.db.query("courses").collect();
    if (existing.length > 0) {
      return;
    }

    const courseId = await ctx.db.insert("courses", {
      title: "Advanced Nuxt 3 Architecture",
      description: "Learn how to build scalable applications using Nuxt 3.",
      progress: 45,
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
      status: "in-progress"
    });

    await ctx.db.insert("tasks", {
      title: "Watch 'Introduction to Nitro'",
      completed: true,
      courseId
    });

    await ctx.db.insert("tasks", {
      title: "Complete Quiz: Server Routes",
      completed: false,
      courseId
    });
  }
});
