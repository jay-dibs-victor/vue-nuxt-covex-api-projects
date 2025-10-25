import { ref, onUnmounted, watch, unref, isRef, type Ref } from 'vue';
import { ConvexClient } from 'convex/browser';

const CONVEX_URL =
  (import.meta as any).env?.NUXT_PUBLIC_CONVEX_URL ||
  "https://famous-seal-464.convex.cloud";

let client: ConvexClient | null = null;

export function getConvexClient(): ConvexClient | null {
  if (!client && typeof window !== 'undefined') {
    try {
      client = new ConvexClient(CONVEX_URL);
    } catch (err) {
      console.error('[Ecommerce-Convex] Failed to initialize client:', err);
    }
  }
  return client;
}

export function useConvexQuery<T = any>(queryName: string, args: any = {}) {
  const data = ref<T | undefined>(undefined) as Ref<T | undefined>;
  const error = ref<Error | undefined>(undefined);
  const loading = ref(true);

  if (typeof window === 'undefined') {
    loading.value = false;
    return { data, error, loading };
  }

  const convex = getConvexClient();
  if (!convex) {
    error.value = new Error('Convex client not initialized');
    loading.value = false;
    return { data, error, loading };
  }

  let unsubscribe: (() => void) | null = null;

  const subscribe = (currentArgs: any) => {
    if (unsubscribe) unsubscribe();
    const plainArgs = isRef(currentArgs) ? currentArgs.value : unref(currentArgs);
    loading.value = true;
    try {
      unsubscribe = convex.onUpdate(
        queryName as any,
        plainArgs,
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
      error.value = err as Error;
      loading.value = false;
    }
  };

  watch(
    () => (isRef(args) ? args.value : unref(args)),
    (newArgs) => { subscribe(newArgs); },
    { immediate: true, deep: true }
  );

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return { data, error, loading };
}

export function useConvexMutation(mutationName: string) {
  return (args: any = {}) => {
    if (typeof window === 'undefined') return Promise.resolve(null);
    const convex = getConvexClient();
    if (!convex) return Promise.reject(new Error('Convex client not initialized'));
    return convex.mutation(mutationName as any, unref(args));
  };
}
