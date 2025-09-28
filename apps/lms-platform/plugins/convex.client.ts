// @ts-nocheck
import { defineNuxtPlugin } from '#app'
import { getConvexClient } from '~/composables/useConvex';

export default defineNuxtPlugin((nuxtApp: any) => {
  // Convex client is initialized once and made available via the singleton pattern in useConvex.ts
});
