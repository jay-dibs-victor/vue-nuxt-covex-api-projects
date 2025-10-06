import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
    tokenIdentifier: v.optional(v.string()), // For auth integration
  }).index("by_token", ["tokenIdentifier"]),

  properties: defineTable({
    title: v.string(),
    description: v.string(),
    location: v.string(),
    price: v.number(),
    images: v.array(v.string()),
    category: v.string(),
    hostId: v.id("users"),
    rating: v.number(),
    reviewsCount: v.number(),
    amenities: v.array(v.string()),
  }).index("by_category", ["category"]),

  bookings: defineTable({
    propertyId: v.id("properties"),
    userId: v.id("users"),
    startDate: v.string(),
    endDate: v.string(),
    totalAmount: v.number(),
    status: v.string(), // "pending", "confirmed", "cancelled"
  }).index("by_user", ["userId"])
    .index("by_property", ["propertyId"]),
});
