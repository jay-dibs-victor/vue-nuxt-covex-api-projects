import { ref, computed } from 'vue';
import { useConvexQuery, useConvexMutation } from './useConvex';

// Session ID — persisted in localStorage
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  let id = localStorage.getItem('ec_session_id');
  if (!id) {
    id = 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('ec_session_id', id);
  }
  return id;
}

const sessionId = ref<string>('');
const isCartOpen = ref(false);

if (typeof window !== 'undefined') {
  sessionId.value = getSessionId();
}

export function useCart() {
  const args = computed(() => ({ sessionId: sessionId.value }));
  const { data: cart, loading } = useConvexQuery('api/cart:getCart', args);

  const items = computed(() => cart.value?.items ?? []);
  const itemCount = computed(() => items.value.reduce((sum: number, i: any) => sum + i.quantity, 0));
  const subtotal = computed(() =>
    items.value.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0)
  );

  const addToCartMut = useConvexMutation('api/cart:addToCart');
  const updateItemMut = useConvexMutation('api/cart:updateCartItem');
  const removeItemMut = useConvexMutation('api/cart:removeFromCart');
  const clearCartMut = useConvexMutation('api/cart:clearCart');

  const addToCart = async (item: {
    productId: string;
    name: string;
    image: string;
    price: number;
    size: string;
    color: string;
    quantity?: number;
  }) => {
    await addToCartMut({ sessionId: sessionId.value, ...item, quantity: item.quantity ?? 1 });
    isCartOpen.value = true;
  };

  const updateQuantity = (index: number, quantity: number) =>
    updateItemMut({ sessionId: sessionId.value, itemIndex: index, quantity });

  const removeItem = (index: number) =>
    removeItemMut({ sessionId: sessionId.value, itemIndex: index });

  const clearCart = () => clearCartMut({ sessionId: sessionId.value });

  const openCart = () => { isCartOpen.value = true; };
  const closeCart = () => { isCartOpen.value = false; };

  return {
    cart,
    items,
    itemCount,
    subtotal,
    loading,
    isCartOpen,
    sessionId,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    openCart,
    closeCart,
  };
}
