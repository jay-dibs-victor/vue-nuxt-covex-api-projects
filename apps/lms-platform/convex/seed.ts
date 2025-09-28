// @ts-nocheck
import { mutation } from "./_generated/server";

export default mutation({
  handler: async (ctx) => {
    // Clear ALL new tables
    const existing = await ctx.db.query("lms_courses").collect();
    for (const c of existing) { await ctx.db.delete(c._id); }
    const tasks = await ctx.db.query("lms_tasks").collect();
    for (const t of tasks) { await ctx.db.delete(t._id); }
    const modules = await ctx.db.query("lms_modules").collect();
    for (const m of modules) { await ctx.db.delete(m._id); }
    const units = await ctx.db.query("lms_units").collect();
    for (const u of units) { await ctx.db.delete(u._id); }
    const activities = await ctx.db.query("lms_activities").collect();
    for (const a of activities) { await ctx.db.delete(a._id); }

    // Seed Courses
    const courseId = await ctx.db.insert("lms_courses", {
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

    await ctx.db.insert("lms_courses", {
      title: "Project Management",
      description: "Master agile workflows.",
      progress: 15,
      thumbnail: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=600",
      status: "not-started",
      instructor: {
        name: "Sarah Jenkins",
        title: "Project Lead",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      totalLessons: 12,
      finishedLessons: 0
    });

    // Seed Modules & Units
    const modId = await ctx.db.insert("lms_modules", {
      courseId,
      title: "Module 3: Linear Regression & Model Building",
      order: 3
    });

    await ctx.db.insert("lms_units", { moduleId: modId, title: "3.1 Introduction", type: "text", status: "completed", order: 1 });
    await ctx.db.insert("lms_units", { moduleId: modId, title: "3.2 Key Concepts", type: "text", status: "completed", order: 2 });
    await ctx.db.insert("lms_units", { moduleId: modId, title: "3.3 Linear Regression", type: "video", status: "active", order: 3, duration: "18:24" });

    // Seed Tasks
    await ctx.db.insert("lms_tasks", { title: "Assignment: Oct 30", subtitle: "Linear Regression Intro", completed: false, type: "assignment" });
    await ctx.db.insert("lms_tasks", { title: "Quiz: Nov 2", subtitle: "Model Evaluation", completed: false, type: "quiz" });

    // Seed Activities
    await ctx.db.insert("lms_activities", { title: "Module Completed", subtitle: "You finished Module 2", type: "success" });
    await ctx.db.insert("lms_activities", { title: "New Resource", subtitle: "Cheatsheet added to Module 3", type: "info" });
  }
});
