// @ts-nocheck
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const placeOrder = mutation({
  args: {
    sessionId: v.string(),
    userId: v.optional(v.string()),
    shippingAddress: v.object({
      name: v.string(),
      line1: v.string(),
      line2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("ec_cart")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = parseFloat((subtotal * 0.08).toFixed(2));
    const shipping = subtotal >= 100 ? 0 : 9.99;
    const total = parseFloat((subtotal + tax + shipping).toFixed(2));

    const orderId = await ctx.db.insert("ec_orders", {
      sessionId: args.sessionId,
      userId: args.userId,
      items: cart.items,
      subtotal,
      tax,
      shipping,
      total,
      status: "pending",
      shippingAddress: args.shippingAddress,
      createdAt: Date.now(),
    });

    // Clear cart after order
    await ctx.db.patch(cart._id, { items: [], updatedAt: Date.now() });

    return orderId;
  },
});

export const getOrders = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ec_orders")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .collect();
  },
});

export const getOrder = query({
  args: { id: v.id("ec_orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("ec_orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, { status: args.status });
  },
});
