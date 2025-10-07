import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBooking = mutation({
  args: {
    propertyId: v.id("properties"),
    userId: v.id("users"),
    startDate: v.string(),
    endDate: v.string(),
    totalAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const bookingId = await ctx.db.insert("bookings", {
      propertyId: args.propertyId,
      userId: args.userId,
      startDate: args.startDate,
      endDate: args.endDate,
      totalAmount: args.totalAmount,
      status: "confirmed", // Simulating successful payment
    });

    return bookingId;
  },
});

export const getUserBookings = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});
