import { computed, ref } from 'vue';
import { useConvexQuery } from '~/composables/useConvex';

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

const mockProducts = [
  {
    _id: 'mock1',
    name: 'MENS APEX JOGGERS - NAVY',
    price: 88.00,
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600'],
    colors: ['#1e3a8a', '#111', '#4b5563'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviewCount: 128,
    category: 'bottoms',
    isNew: true
  },
  {
    _id: 'mock2',
    name: 'WOMENS CORE TIGHTS',
    price: 74.00,
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600'],
    colors: ['#111', '#84a59d', '#4b5563'],
    sizes: ['S', 'M', 'L'],
    rating: 5,
    reviewCount: 89,
    category: 'bottoms',
    featured: true
  },
  {
    _id: 'mock3',
    name: 'STEALTH PERFORMANCE TEE',
    price: 38.00,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600'],
    colors: ['#111', '#4b5563'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.2,
    reviewCount: 215,
    category: 'tops'
  }
];

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

  const { data: productsData, loading, error } = useConvexQuery('products:listProducts', args);

  const products = computed(() => productsData.value || (error.value ? mockProducts : []));

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
  const { data, loading, error } = useConvexQuery('products:getFeaturedProducts', {});
  const products = computed(() => data.value || (error.value ? mockProducts.slice(0, 2) : []));
  return { data: products, loading, error };
}

export function useNewArrivals() {
  const { data, loading, error } = useConvexQuery('products:getNewArrivals', {});
  const products = computed(() => data.value || (error.value ? [mockProducts[0]] : []));
  return { data: products, loading, error };
}

export function useProduct(id: string) {
  const args = computed(() => ({ id }));
  const { data, loading, error } = useConvexQuery('products:getProduct', args);
  const product = computed(() => data.value || (error.value ? mockProducts[0] : null));
  return { product, loading, error };
}
