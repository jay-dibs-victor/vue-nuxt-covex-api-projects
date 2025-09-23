// @ts-nocheck
import { mutation } from "./_generated/server";

export default mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("courses").collect();
    if (existing.length > 0) {
      // Clear existing for a clean seed
      for (const course of existing) { await ctx.db.delete(course._id); }
      const oldTasks = await ctx.db.query("tasks").collect();
      for (const task of oldTasks) { await ctx.db.delete(task._id); }
      const oldModules = await ctx.db.query("courseModules").collect();
      for (const m of oldModules) { await ctx.db.delete(m._id); }
      const oldUnits = await ctx.db.query("courseUnits").collect();
      for (const u of oldUnits) { await ctx.db.delete(u._id); }
      const oldActs = await ctx.db.query("activities").collect();
      for (const a of oldActs) { await ctx.db.delete(a._id); }
    }

    const courseId = await ctx.db.insert("courses", {
      title: "Data Science Masterclass",
      description: "Learn how to build scalable models using data science.",
      progress: 68,
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
      status: "active",
      instructor: {
        name: "Dr. Aris Thorne",
        title: "Instructor",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      totalLessons: 33,
      finishedLessons: 22
    });

    // Add secondary course to show in list
    await ctx.db.insert("courses", {
      title: "Project Management",
      description: "Master agile workflows.",
      progress: 15,
      thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
      status: "active",
      instructor: { name: "Sarah Jenkins", title: "Instructor", avatar: "" },
      totalLessons: 10,
      finishedLessons: 1
    });

    const moduleId = await ctx.db.insert("courseModules", {
      courseId,
      title: "Module 3: Linear Regression & Model Building",
      order: 3
    });

    await ctx.db.insert("courseUnits", { moduleId, title: "3.1 Introduction", type: "text", status: "completed", order: 1 });
    await ctx.db.insert("courseUnits", { moduleId, title: "3.2 Key Concepts", type: "text", status: "completed", order: 2 });
    await ctx.db.insert("courseUnits", { moduleId, title: "3.3 Linear Regression", type: "video", status: "active", order: 3, duration: "18:24" });
    await ctx.db.insert("courseUnits", { moduleId, title: "3.4 Model Building", type: "resource", status: "locked", order: 4 });
    await ctx.db.insert("courseUnits", { moduleId, title: "3.5 Hands-on Lab", type: "resource", status: "locked", order: 5 });

    await ctx.db.insert("tasks", { title: "Assignment: Oct 30", subtitle: "Assignment today", completed: false, type: "assignment" });
    await ctx.db.insert("tasks", { title: "Quiz Nov 2", subtitle: "Assignment now", completed: false, type: "quiz" });

    await ctx.db.insert("activities", { title: "Assignment graded", subtitle: "Added 3 hours ago", type: "success" });
    await ctx.db.insert("activities", { title: "Recent Activity", subtitle: "Decent 2 hours ago", type: "info" });
    await ctx.db.insert("activities", { title: "Laura warns vepask", subtitle: "Next 3 hours ago", type: "warning" });
  }
});
