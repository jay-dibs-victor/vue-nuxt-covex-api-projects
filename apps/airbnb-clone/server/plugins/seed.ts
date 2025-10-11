import { ConvexClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

export default defineNitroPlugin(async (nitroApp) => {
  const convexUrl = process.env.CONVEX_URL || process.env.NUXT_PUBLIC_CONVEX_URL;
  
  if (!convexUrl) {
    console.warn("[Seed Plugin] CONVEX_URL not found, skipping seed.");
    return;
  }

  console.log("[Seed Plugin] Running seeder...");
  try {
    const client = new ConvexClient(convexUrl);
    // Use the typed API reference instead of a string
    await client.mutation(api.seed.default, {});
    console.log("[Seed Plugin] Seeding complete.");
  } catch (err) {
    console.error("[Seed Plugin] Seeding failed:", err);
  }
});
