// @ts-nocheck
import { defineNuxtPlugin } from '#app'
import { ConvexClient } from "convex/browser";

export default defineNuxtPlugin(async (nuxtApp: any) => {
  // Use VITE_CONVEX_URL from env, or fallback to the local dev server
  const convexUrl = import.meta.env.VITE_CONVEX_URL || "http://127.0.0.1:3210";
  const client = new ConvexClient(convexUrl);

  nuxtApp.provide('convex', client);

  // Automatically run the seeder on startup.
  // The mutation has a safety check to avoid overwriting existing data.
  try {
    await client.mutation("seed" as any, {});
    console.log("Seeder executed successfully.");
  } catch (e) {
    console.error("Seeder failed to execute:", e);
  }
});
