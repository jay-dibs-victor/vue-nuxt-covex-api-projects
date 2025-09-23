// @ts-nocheck
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  courses: defineTable({
    title: v.string(),
    description: v.string(),
    progress: v.number(),
    thumbnail: v.string(),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("not-started")),
    instructor: v.optional(v.object({
      name: v.string(),
      avatar: v.string(),
      title: v.string(),
    })),
    totalLessons: v.optional(v.number()),
    finishedLessons: v.optional(v.number()),
  }),
  courseModules: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    order: v.number(),
  }),
  courseUnits: defineTable({
    moduleId: v.id("courseModules"),
    title: v.string(),
    type: v.union(v.literal("text"), v.literal("video"), v.literal("resource"), v.literal("quiz")),
    status: v.union(v.literal("completed"), v.literal("active"), v.literal("locked")),
    order: v.number(),
    duration: v.optional(v.string()),
  }),
  tasks: defineTable({
    title: v.string(),
    subtitle: v.string(),
    completed: v.boolean(),
    type: v.union(v.literal("assignment"), v.literal("quiz")),
  }),
  activities: defineTable({
    title: v.string(),
    subtitle: v.string(),
    type: v.union(v.literal("success"), v.literal("info"), v.literal("warning")),
  })
});
