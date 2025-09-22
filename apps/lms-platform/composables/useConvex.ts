// @ts-nocheck
import { ref, onUnmounted } from 'vue';
import { ConvexClient } from 'convex/browser';

let client = null;

export function getConvexClient() {
  if (!client && import.meta.client) {
    const config = useRuntimeConfig();
    const convexUrl = config.public.convexUrl || import.meta.env.VITE_CONVEX_URL || "http://127.0.0.1:3210";
    client = new ConvexClient(convexUrl);
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
  if (!convex) return { data, error };

  const unsubscribe = convex.onUpdate(queryName, args, 
    (newData: any) => { data.value = newData; }, 
    (err: Error) => { error.value = err; }
  );

  onUnmounted(() => {
    unsubscribe();
  });

  return { data, error };
}

export function useConvexMutation(mutationName: string) {
  return (args: Record<string, any> = {}) => {
    if (!import.meta.client) return Promise.resolve(null);
    const convex = getConvexClient();
    if (!convex) return Promise.resolve(null);
    return convex.mutation(mutationName, args);
  };
}
