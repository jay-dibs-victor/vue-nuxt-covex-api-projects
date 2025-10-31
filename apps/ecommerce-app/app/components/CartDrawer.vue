<template>
  <Transition name="fade">
    <div v-if="isCartOpen" class="overlay" @click="closeCart"></div>
  </Transition>

  <Transition name="slide">
    <aside v-if="isCartOpen" class="drawer">
      <div class="drawer-header">
        <h3>YOUR CART ({{ itemCount }})</h3>
        <button class="close-btn" @click="closeCart">✕</button>
      </div>

      <div v-if="items.length > 0" class="cart-content">
        <div class="items-list">
          <div v-for="(item, index) in items" :key="index" class="cart-item">
            <div class="item-img">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-details">
              <div class="item-row">
                <h4>{{ item.name.toUpperCase() }}</h4>
                <button class="remove-btn" @click="removeItem(index)">✕</button>
              </div>
              <p class="item-meta">Size: {{ item.size }} | Color: {{ item.color }}</p>
              <div class="item-row bottom">
                <div class="qty-control">
                  <button @click="updateQuantity(index, item.quantity - 1)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="updateQuantity(index, item.quantity + 1)">+</button>
                </div>
                <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="drawer-footer">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <p class="shipping-note">Shipping & taxes calculated at checkout</p>
          <button class="checkout-btn" @click="goToCheckouts">CHECKOUT</button>
          <button class="view-cart-btn" @click="goToCart">VIEW FULL CART</button>
        </div>
      </div>

      <div v-else class="empty-cart">
        <span class="empty-icon">🛒</span>
        <p>Your cart is empty</p>
        <button class="shop-btn" @click="closeCart">CONTINUE SHOPPING</button>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { useCart } from '~/composables/useCart'
import { useRouter } from 'vue-router'

const { isCartOpen, closeCart, items, itemCount, subtotal, updateQuantity, removeItem } = useCart()
const router = useRouter()

const goToCart = () => {
  closeCart()
  router.push('/cart')
}

const goToCheckouts = () => {
  closeCart()
  router.push('/checkout')
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  z-index: 300;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  max-width: 100%;
  height: 100%;
  background: white;
  z-index: 301;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
}

.drawer-header {
  padding: 2rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-header h3 {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  margin: 0;
  letter-spacing: 1px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #999;
}

.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.items-list {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f9f9f9;
}

.item-img {
  width: 100px;
  aspect-ratio: 1;
  background: #f7f7f7;
}

.item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.item-row h4 {
  font-size: 0.85rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 0.5px;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 0.8rem;
  color: #ccc;
  cursor: pointer;
}

.item-meta {
  font-size: 0.75rem;
  color: #999;
  margin: 0 0 1rem 0;
}

.bottom {
  align-items: center;
  margin-top: auto;
}

.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 4px;
}

.qty-control button {
  background: none;
  border: none;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 1rem;
}

.qty-control span {
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.item-price {
  font-weight: 700;
  font-size: 0.9rem;
}

.drawer-footer {
  padding: 2rem;
  background: #fdfdfd;
  border-top: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.shipping-note {
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 2rem;
}

.checkout-btn {
  width: 100%;
  padding: 1.25rem;
  background: #111;
  color: white;
  border: none;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 2px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.view-cart-btn {
  width: 100%;
  padding: 1rem;
  background: transparent;
  color: #111;
  border: 1px solid #eee;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}

.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.2;
}

.shop-btn {
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: #111;
  color: white;
  border: none;
  font-weight: 700;
  cursor: pointer;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
