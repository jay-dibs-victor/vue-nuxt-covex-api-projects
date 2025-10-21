// @ts-nocheck
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ec_products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    price: v.number(),
    comparePrice: v.optional(v.number()),
    category: v.union(
      v.literal("tops"),
      v.literal("bottoms"),
      v.literal("outerwear"),
      v.literal("accessories")
    ),
    gender: v.union(v.literal("men"), v.literal("women"), v.literal("unisex")),
    images: v.array(v.string()),
    colors: v.array(v.string()),
    sizes: v.array(v.string()),
    stock: v.number(),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    featured: v.boolean(),
    isNew: v.boolean(),
    tags: v.array(v.string()),
  })
    .index("by_category", ["category"])
    .index("by_gender", ["gender"])
    .index("by_slug", ["slug"]),

  ec_users: defineTable({
    email: v.string(),
    name: v.string(),
    passwordHash: v.string(),
    address: v.optional(v.object({
      line1: v.string(),
      line2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
      country: v.string(),
    })),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  ec_cart: defineTable({
    sessionId: v.string(),
    userId: v.optional(v.string()),
    items: v.array(v.object({
      productId: v.id("ec_products"),
      name: v.string(),
      image: v.string(),
      price: v.number(),
      size: v.string(),
      color: v.string(),
      quantity: v.number(),
    })),
    updatedAt: v.number(),
  }).index("by_session", ["sessionId"]),

  ec_orders: defineTable({
    userId: v.optional(v.string()),
    sessionId: v.string(),
    items: v.array(v.object({
      productId: v.id("ec_products"),
      name: v.string(),
      image: v.string(),
      price: v.number(),
      size: v.string(),
      color: v.string(),
      quantity: v.number(),
    })),
    subtotal: v.number(),
    tax: v.number(),
    shipping: v.number(),
    total: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    shippingAddress: v.object({
      name: v.string(),
      line1: v.string(),
      line2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
    createdAt: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_user", ["userId"]),

  ec_reviews: defineTable({
    productId: v.id("ec_products"),
    userId: v.optional(v.string()),
    reviewerName: v.string(),
    rating: v.number(),
    title: v.string(),
    body: v.string(),
    createdAt: v.number(),
  }).index("by_product", ["productId"]),
});
