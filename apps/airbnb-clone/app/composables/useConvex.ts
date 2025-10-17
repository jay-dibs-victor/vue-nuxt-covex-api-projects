import { ref, onUnmounted, watch, unref, isRef } from 'vue';
import { ConvexClient } from 'convex/browser';

let client: ConvexClient | null = null;

export function getConvexClient(): ConvexClient | null {
  if (!client && import.meta.client) {
    const config = useRuntimeConfig();
    const convexUrl = config.public.convexUrl as string;
    console.log(`[Airbnb-Convex] Initializing client with: ${convexUrl}`);
    if (!convexUrl) {
      console.error("[Airbnb-Convex] Critical: Convex URL is missing from runtime config!");
    }
    try {
      client = new ConvexClient(convexUrl);
    } catch (err) {
      console.error(`[Airbnb-Convex] Failed to initialize client:`, err);
    }
  }
  return client;
}

export function useConvexQuery<T = any>(queryName: string, args: any = {}) {
  const data = ref<T | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);
  const loading = ref(true);

  if (!import.meta.client) {
    return { data, error, loading };
  }

  const convex = getConvexClient();
  if (!convex) {
    error.value = new Error("Convex client not initialized");
    loading.value = false;
    return { data, error, loading };
  }

  let unsubscribe: (() => void) | null = null;

  const subscribe = (currentArgs: any) => {
    if (unsubscribe) unsubscribe();
    
    // Ensure we pass a plain object to Convex
    const plainArgs = isRef(currentArgs) ? currentArgs.value : unref(currentArgs);
    
    loading.value = true;
    try {
      unsubscribe = convex.onUpdate(queryName, plainArgs, 
        (newData: T) => { 
          data.value = newData; 
          error.value = undefined;
          loading.value = false;
        }, 
        (err: Error) => { 
          console.error(`[Convex] Query error (${queryName}):`, err);
          error.value = err; 
          loading.value = false;
        }
      );
    } catch (err: any) {
      console.error(`[Convex] Subscription failed:`, err);
      error.value = err as Error;
      loading.value = false;
    }
  };

  // Watch for changes in args and re-subscribe
  watch(() => (isRef(args) ? args.value : unref(args)), (newArgs) => {
    subscribe(newArgs);
  }, { immediate: true, deep: true });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return { data, error, loading };
}

export function useConvexMutation(mutationName: string) {
  return (args: any = {}) => {
    if (!import.meta.client) return Promise.resolve(null);
    const convex = getConvexClient();
    if (!convex) return Promise.reject(new Error("Convex client not initialized"));
    return convex.mutation(mutationName, unref(args));
  };
}
