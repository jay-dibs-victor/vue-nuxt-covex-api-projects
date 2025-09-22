// @ts-nocheck
import { defineNuxtPlugin } from '#app'
import { getConvexClient } from '~/composables/useConvex';

export default defineNuxtPlugin((nuxtApp: any) => {
  const client = getConvexClient();
  
  if (client) {
    client.mutation("seed" as any, {}).then(() => {
      console.log("[Convex] Seeder executed successfully.");
    }).catch((e: any) => {
      console.error("[Convex] Seeder failed to execute:", e);
    });
  }
});
