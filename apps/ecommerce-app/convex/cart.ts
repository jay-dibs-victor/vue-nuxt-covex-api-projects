// @ts-nocheck
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCart = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ec_cart")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
  },
});

export const addToCart = mutation({
  args: {
    sessionId: v.string(),
    productId: v.id("ec_products"),
    name: v.string(),
    image: v.string(),
    price: v.number(),
    size: v.string(),
    color: v.string(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const { sessionId, ...itemData } = args;
    const cart = await ctx.db
      .query("ec_cart")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .first();

    if (!cart) {
      await ctx.db.insert("ec_cart", {
        sessionId,
        items: [itemData],
        updatedAt: Date.now(),
      });
      return;
    }

    const existingIndex = cart.items.findIndex(
      (i) =>
        i.productId === args.productId &&
        i.size === args.size &&
        i.color === args.color
    );

    const newItems = [...cart.items];
    if (existingIndex >= 0) {
      newItems[existingIndex] = {
        ...newItems[existingIndex],
        quantity: newItems[existingIndex].quantity + args.quantity,
      };
    } else {
      newItems.push(itemData);
    }

    await ctx.db.patch(cart._id, { items: newItems, updatedAt: Date.now() });
  },
});

export const updateCartItem = mutation({
  args: {
    sessionId: v.string(),
    itemIndex: v.number(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("ec_cart")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
    if (!cart) return;

    const newItems = [...cart.items];
    if (args.quantity <= 0) {
      newItems.splice(args.itemIndex, 1);
    } else {
      newItems[args.itemIndex] = { ...newItems[args.itemIndex], quantity: args.quantity };
    }
    await ctx.db.patch(cart._id, { items: newItems, updatedAt: Date.now() });
  },
});

export const removeFromCart = mutation({
  args: { sessionId: v.string(), itemIndex: v.number() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("ec_cart")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
    if (!cart) return;
    const newItems = cart.items.filter((_, i) => i !== args.itemIndex);
    await ctx.db.patch(cart._id, { items: newItems, updatedAt: Date.now() });
  },
});

export const clearCart = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("ec_cart")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
    if (!cart) return;
    await ctx.db.patch(cart._id, { items: [], updatedAt: Date.now() });
  },
});
