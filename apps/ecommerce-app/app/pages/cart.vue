<template>
  <div class="container cart-page">
    <div v-if="items.length > 0" class="cart-layout">
      <div class="cart-main">
        <h1>YOUR SHOPPING CART</h1>
        <p class="cart-subtitle">Review your items before proceeding to checkout.</p>

        <div class="items-table">
          <div class="table-header">
            <span>PRODUCT</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>

          <div v-for="(item, index) in items" :key="index" class="table-row">
            <div class="product-cell">
              <div class="p-img"><img :src="item.image" :alt="item.name" /></div>
              <div class="p-info">
                <h4>{{ item.name.toUpperCase() }}</h4>
                <p>Size: {{ item.size }} | Color: {{ item.color }}</p>
                <button class="remove-link" @click="removeItem(index)">Remove</button>
              </div>
            </div>
            <div class="price-cell">${{ item.price.toFixed(2) }}</div>
            <div class="qty-cell">
              <div class="qty-ctrl">
                <button @click="updateQuantity(index, item.quantity - 1)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="updateQuantity(index, item.quantity + 1)">+</button>
              </div>
            </div>
            <div class="total-cell">${{ (item.price * item.quantity).toFixed(2) }}</div>
          </div>
        </div>
      </div>

      <div class="cart-sidebar">
        <div class="summary-box">
          <h3>ORDER SUMMARY</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Estimated Shipping</span>
            <span>{{ subtotal >= 100 ? 'FREE' : '$9.99' }}</span>
          </div>
          <div class="summary-row total">
            <span>Estimated Total</span>
            <span>${{ (subtotal + (subtotal >= 100 ? 0 : 9.99)).toFixed(2) }}</span>
          </div>
          <button class="checkout-btn" @click="router.push('/checkout')">PROCEED TO CHECKOUT</button>
          <div class="payment-icons">
            <span>Secure checkout with SSL encryption</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-cart">
      <h1>YOUR CART IS EMPTY</h1>
      <p>Looking for inspiration? Browse our latest arrivals.</p>
      <NuxtLink to="/" class="shop-btn">CONTINUE SHOPPING</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '~/composables/useCart'
import { useRouter } from 'vue-router'

const { items, subtotal, updateQuantity, removeItem } = useCart()
const router = useRouter()
</script>

<style scoped>
.cart-page { padding: 6rem 0; }
.cart-layout { display: grid; grid-template-columns: 1fr 350px; gap: 4rem; }
h1 { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 2.5rem; margin-bottom: 0.5rem; }
.cart-subtitle { color: #666; margin-bottom: 3rem; }

.table-header { display: grid; grid-template-columns: 1fr 100px 150px 100px; padding: 1.5rem 0; border-bottom: 1px solid #eee; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; color: #999; }
.table-row { display: grid; grid-template-columns: 1fr 100px 150px 100px; padding: 2rem 0; border-bottom: 1px solid #f9f9f9; align-items: center; }

.product-cell { display: flex; gap: 1.5rem; }
.p-img { width: 120px; aspect-ratio: 1; background: #f7f7f7; }
.p-img img { width: 100%; height: 100%; object-fit: cover; }
.p-info h4 { font-size: 0.95rem; font-weight: 800; margin: 0 0 0.5rem 0; }
.p-info p { font-size: 0.8rem; color: #999; margin-bottom: 1rem; }
.remove-link { background: none; border: none; color: #ef4444; font-size: 0.75rem; font-weight: 700; text-decoration: underline; cursor: pointer; padding: 0; }

.qty-ctrl { display: flex; align-items: center; border: 1px solid #eee; width: fit-content; border-radius: 4px; }
.qty-ctrl button { background: none; border: none; padding: 0.5rem 1rem; cursor: pointer; }
.qty-ctrl span { min-width: 30px; text-align: center; font-weight: 600; }

.summary-box { background: #f9f9f9; padding: 2rem; border-radius: 0.5rem; position: sticky; top: 120px; }
.summary-box h3 { font-family: 'Outfit', sans-serif; font-weight: 800; margin-bottom: 2rem; font-size: 1.1rem; }
.summary-row { display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.9rem; font-weight: 500; }
.summary-row.total { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #eee; font-weight: 800; font-size: 1.2rem; }
.checkout-btn { width: 100%; padding: 1.25rem; background: #111; color: white; border: none; font-weight: 800; font-size: 0.9rem; letter-spacing: 1px; cursor: pointer; margin-top: 2rem; }
.payment-icons { margin-top: 1.5rem; text-align: center; font-size: 0.7rem; color: #999; }

.empty-cart { text-align: center; padding: 10rem 0; }
.shop-btn { display: inline-block; margin-top: 2rem; padding: 1.25rem 3rem; background: #111; color: white; text-decoration: none; font-weight: 800; }

@media (max-width: 1024px) { .cart-layout { grid-template-columns: 1fr; } .table-header { display: none; } .table-row { grid-template-columns: 1fr; gap: 1.5rem; text-align: center; } .product-cell { flex-direction: column; align-items: center; } .qty-ctrl { margin: 0 auto; } }
</style>
