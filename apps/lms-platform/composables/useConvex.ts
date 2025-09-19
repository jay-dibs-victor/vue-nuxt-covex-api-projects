import { ref, onUnmounted, watchEffect } from 'vue';
import { useNuxtApp } from '#app';

export function useConvexQuery(queryName: string, args: Record<string, any> = {}) {
  const { $convex } = useNuxtApp();
  const data = ref<any>(undefined);
  const error = ref<Error | undefined>(undefined);

  if (!$convex) {
    console.error("Convex client not found. Ensure the plugin is loaded.");
    return { data, error };
  }

  const unsubscribe = ($convex as any).onUpdate(queryName, args, 
    (newData: any) => { data.value = newData; }, 
    (err: Error) => { error.value = err; }
  );

  onUnmounted(() => {
    unsubscribe();
  });

  return { data, error };
}

export function useConvexMutation(mutationName: string) {
  const { $convex } = useNuxtApp();
  return (args: Record<string, any> = {}) => {
    return ($convex as any).mutation(mutationName, args);
  };
}
