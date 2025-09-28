// @ts-nocheck
import { ref, onUnmounted } from 'vue';
import { ConvexClient } from 'convex/browser';

let client = null;

export function getConvexClient() {
  if (!client && import.meta.client) {
    const config = useRuntimeConfig();
    const convexUrl = config.public.convexUrl || "http://127.0.0.1:3210";
    console.log(`[Convex] Connecting to: ${convexUrl}`);
    try {
      client = new ConvexClient(convexUrl);
    } catch (err) {
      console.error(`[Convex] Failed to initialize client:`, err);
    }
  }
  return client;
}

export function useConvexQuery(queryName: string, args: Record<string, any> = {}) {
  const data = ref<any>(undefined);
  const error = ref<Error | undefined>(undefined);

  if (!import.meta.client) {
    return { data, error }; // Skip Convex queries during Server-Side Rendering
  }

  const convex = getConvexClient();
  if (!convex) {
    error.value = new Error("Convex client not initialized");
    return { data, error };
  }

  try {
    const unsubscribe = convex.onUpdate(queryName, args, 
      (newData: any) => { 
        data.value = newData; 
        error.value = undefined;
      }, 
      (err: Error) => { 
        console.error(`[Convex] Query error (${queryName}):`, err);
        error.value = err; 
      }
    );

    onUnmounted(() => {
      unsubscribe();
    });
  } catch (err) {
    console.error(`[Convex] Failed to subscribe to ${queryName}:`, err);
    error.value = err;
  }

  return { data, error };
}

export function useConvexMutation(mutationName: string) {
  return (args: Record<string, any> = {}) => {
    if (!import.meta.client) return Promise.resolve(null);
    const convex = getConvexClient();
    if (!convex) return Promise.reject(new Error("Convex client not initialized"));
    return convex.mutation(mutationName, args);
  };
}
