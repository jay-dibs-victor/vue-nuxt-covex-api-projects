// @ts-nocheck
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  courses: defineTable({
    title: v.string(),
    description: v.string(),
    progress: v.number(),
    thumbnail: v.string(),
    status: v.union(v.literal("in-progress"), v.literal("completed"), v.literal("not-started")),
  }),
  tasks: defineTable({
    title: v.string(),
    completed: v.boolean(),
    courseId: v.id("courses"),
  })
});
