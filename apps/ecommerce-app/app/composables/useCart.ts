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
const localCartItems = ref<any[]>([]); // Fallback for when Convex is down

if (typeof window !== 'undefined') {
  sessionId.value = getSessionId();
}

export function useCart() {
  const args = computed(() => ({ sessionId: sessionId.value }));
  const { data: cart, loading, error } = useConvexQuery('cart:getCart', args);

  const items = computed(() => {
    if (cart.value?.items) return cart.value.items;
    return localCartItems.value;
  });

  const itemCount = computed(() => items.value.reduce((sum: number, i: any) => sum + i.quantity, 0));
  const subtotal = computed(() =>
    items.value.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0)
  );

  const addToCartMut = useConvexMutation('cart:addToCart');
  const updateItemMut = useConvexMutation('cart:updateCartItem');
  const removeItemMut = useConvexMutation('cart:removeFromCart');
  const clearCartMut = useConvexMutation('cart:clearCart');

  const addToCart = async (item: {
    productId: string;
    name: string;
    image: string;
    price: number;
    size: string;
    color: string;
    quantity?: number;
  }) => {
    try {
      await addToCartMut({ sessionId: sessionId.value, ...item, quantity: item.quantity ?? 1 });
    } catch (err) {
      // Local fallback
      const existing = localCartItems.value.find(i => 
        i.productId === item.productId && i.size === item.size && i.color === item.color
      );
      if (existing) {
        existing.quantity += (item.quantity ?? 1);
      } else {
        localCartItems.value.push({ ...item, quantity: item.quantity ?? 1 });
      }
    }
    isCartOpen.value = true;
  };

  const updateQuantity = async (index: number, quantity: number) => {
    if (quantity < 1) return removeItem(index);
    try {
      await updateItemMut({ sessionId: sessionId.value, itemIndex: index, quantity });
    } catch (err) {
      if (localCartItems.value[index]) {
        localCartItems.value[index].quantity = quantity;
      }
    }
  };

  const removeItem = async (index: number) => {
    try {
      await removeItemMut({ sessionId: sessionId.value, itemIndex: index });
    } catch (err) {
      localCartItems.value.splice(index, 1);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartMut({ sessionId: sessionId.value });
    } catch (err) {
      localCartItems.value = [];
    }
  };

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
