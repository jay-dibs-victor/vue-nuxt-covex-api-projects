import { computed, ref } from 'vue';
import { useConvexQuery } from './useConvex';

export const filters = ref({
  category: '',
  gender: '',
  minPrice: undefined as number | undefined,
  maxPrice: undefined as number | undefined,
  sortBy: 'featured',
});

export function useProducts() {
  const args = computed(() => ({
    category: filters.value.category || undefined,
    gender: filters.value.gender || undefined,
    minPrice: filters.value.minPrice,
    maxPrice: filters.value.maxPrice,
    sortBy: filters.value.sortBy === 'featured' ? undefined : filters.value.sortBy,
  }));

  const { data: products, loading, error } = useConvexQuery('api/products:listProducts', args);

  const setCategory = (cat: string) => { filters.value.category = cat; };
  const setGender = (g: string) => { filters.value.gender = g; };
  const setPriceRange = (min?: number, max?: number) => {
    filters.value.minPrice = min;
    filters.value.maxPrice = max;
  };
  const setSort = (sort: string) => { filters.value.sortBy = sort; };
  const resetFilters = () => {
    filters.value = { category: '', gender: '', minPrice: undefined, maxPrice: undefined, sortBy: 'featured' };
  };

  return {
    products,
    loading,
    error,
    filters,
    setCategory,
    setGender,
    setPriceRange,
    setSort,
    resetFilters,
  };
}

export function useFeaturedProducts() {
  return useConvexQuery('api/products:getFeaturedProducts', {});
}

export function useNewArrivals() {
  return useConvexQuery('api/products:getNewArrivals', {});
}

export function useProduct(id: string) {
  const args = computed(() => ({ id }));
  return useConvexQuery('api/products:getProduct', args);
}
