import { computed, ref } from 'vue';
import { useConvexQuery } from './useConvex';

export const filters = ref({
  category: '',
  gender: '',
  minPrice: undefined as number | undefined,
  maxPrice: undefined as number | undefined,
  sortBy: 'featured',
  sizes: [] as string[],
  colors: [] as string[],
  minRating: undefined as number | undefined,
});

export function useProducts() {
  const args = computed(() => ({
    category: filters.value.category || undefined,
    gender: filters.value.gender || undefined,
    minPrice: filters.value.minPrice,
    maxPrice: filters.value.maxPrice,
    sortBy: filters.value.sortBy === 'featured' ? undefined : filters.value.sortBy,
    sizes: filters.value.sizes.length > 0 ? filters.value.sizes : undefined,
    colors: filters.value.colors.length > 0 ? filters.value.colors : undefined,
    minRating: filters.value.minRating,
  }));

  const { data: products, loading, error } = useConvexQuery('api/products:listProducts', args);

  const setCategory = (cat: string) => { filters.value.category = cat; };
  const setGender = (g: string) => { filters.value.gender = g; };
  const toggleSize = (size: string) => {
    const index = filters.value.sizes.indexOf(size);
    if (index > -1) filters.value.sizes.splice(index, 1);
    else filters.value.sizes.push(size);
  };
  const toggleColor = (color: string) => {
    const index = filters.value.colors.indexOf(color);
    if (index > -1) filters.value.colors.splice(index, 1);
    else filters.value.colors.push(color);
  };
  const setMinRating = (rating: number) => { filters.value.minRating = rating; };
  const setPriceRange = (min?: number, max?: number) => {
    filters.value.minPrice = min;
    filters.value.maxPrice = max;
  };
  const setSort = (sort: string) => { filters.value.sortBy = sort; };
  const resetFilters = () => {
    filters.value = { 
      category: '', 
      gender: '', 
      minPrice: undefined, 
      maxPrice: undefined, 
      sortBy: 'featured',
      sizes: [],
      colors: [],
      minRating: undefined
    };
  };

  return {
    products,
    loading,
    error,
    filters,
    setCategory,
    setGender,
    toggleSize,
    toggleColor,
    setMinRating,
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
