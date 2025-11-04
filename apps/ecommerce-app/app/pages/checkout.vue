<template>
  <div class="container checkout-page">
    <div v-if="isPlacing" class="loading-overlay">
      <div class="spinner"></div>
      <p>PLACING YOUR ORDER...</p>
    </div>

    <div v-if="orderSuccess" class="success-screen">
      <span class="icon">✨</span>
      <h1>ORDER PLACED SUCCESSFULLY!</h1>
      <p>Thank you for shopping with Velocity Active. Your order #{{ orderSuccess.slice(-8).toUpperCase() }} is being processed.</p>
      <NuxtLink to="/orders" class="primary-btn">VIEW MY ORDERS</NuxtLink>
    </div>

    <div v-else class="checkout-layout">
      <div class="checkout-main">
        <h1>CHECKOUT</h1>
        
        <section class="checkout-section">
          <div class="section-num">1</div>
          <h3>SHIPPING ADDRESS</h3>
          <form class="address-form">
            <div class="form-row">
              <div class="input-group">
                <label>FULL NAME</label>
                <input v-model="address.name" type="text" placeholder="John Doe" />
              </div>
            </div>
            <div class="form-row">
              <div class="input-group">
                <label>ADDRESS LINE 1</label>
                <input v-model="address.line1" type="text" placeholder="123 Performance Way" />
              </div>
            </div>
            <div class="form-row col-2">
              <div class="input-group">
                <label>CITY</label>
                <input v-model="address.city" type="text" placeholder="Los Angeles" />
              </div>
              <div class="input-group">
                <label>ZIP CODE</label>
                <input v-model="address.zip" type="text" placeholder="90210" />
              </div>
            </div>
          </form>
        </section>

        <section class="checkout-section">
          <div class="section-num">2</div>
          <h3>PAYMENT METHOD</h3>
          <div class="mock-payment">
            <p><strong>SIMULATED PAYMENT</strong></p>
            <p>This is a showcase application. No real payment information is required.</p>
          </div>
        </section>
      </div>

      <div class="checkout-sidebar">
        <div class="order-box">
          <h3>YOUR ORDER</h3>
          <div class="mini-items">
            <div v-for="(item, idx) in items" :key="idx" class="mini-item">
              <img :src="item.image" :alt="item.name" />
              <div class="m-info">
                <p class="m-name">{{ item.name }} x{{ item.quantity }}</p>
                <p class="m-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <div class="totals">
            <div class="t-row"><span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span></div>
            <div class="t-row"><span>Shipping</span><span>{{ subtotal >= 100 ? 'FREE' : '$9.99' }}</span></div>
            <div class="t-row grand"><span>Total</span><span>${{ total.toFixed(2) }}</span></div>
          </div>

          <button class="place-order-btn" @click="handlePlaceOrder">PLACE ORDER</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useCart } from '~/composables/useCart'
import { useAuth } from '~/composables/useAuth'
import { useConvexMutation } from '~/composables/useConvex'

const { items, subtotal, sessionId, clearCart } = useCart()
const { currentUser } = useAuth()
const placeOrderMut = useConvexMutation('api/orders:placeOrder')

const isPlacing = ref(false)
const orderSuccess = ref(null)

const address = reactive({
  name: currentUser.value?.name || '',
  line1: '',
  city: '',
  state: 'CA',
  zip: '',
  country: 'USA'
})

const total = computed(() => subtotal.value + (subtotal.value >= 100 ? 0 : 9.99))

const handlePlaceOrder = async () => {
  if (!address.line1 || !address.city) {
    window.$toast?.add('Please fill in shipping details', 'error')
    return
  }

  isPlacing.value = true
  try {
    const res = await placeOrderMut({
      sessionId: sessionId.value,
      userId: currentUser.value?._id,
      shippingAddress: { ...address }
    })
    orderSuccess.value = res
    clearCart()
    window.$toast?.add('Order placed successfully!')
  } catch (err) {
    window.$toast?.add('Failed to place order', 'error')
  } finally {
    isPlacing.value = false
  }
}
</script>

<style scoped>
.checkout-page { padding: 6rem 0; min-height: 80vh; }
.checkout-layout { display: grid; grid-template-columns: 1fr 400px; gap: 5rem; }
h1 { font-family: 'Outfit', sans-serif; font-weight: 800; margin-bottom: 3rem; }

.checkout-section { margin-bottom: 4rem; position: relative; padding-left: 4rem; }
.section-num { position: absolute; left: 0; top: 0; width: 2.5rem; height: 2.5rem; background: #111; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem; }
.checkout-section h3 { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.25rem; margin: 0 0 2rem 0; }

.form-row { margin-bottom: 1.5rem; }
.form-row.col-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.input-group label { display: block; font-size: 0.7rem; font-weight: 800; margin-bottom: 0.5rem; }
.input-group input { width: 100%; padding: 1rem; border: 1px solid #eee; border-radius: 0.5rem; }

.mock-payment { background: #f9f9f9; padding: 2rem; border-radius: 0.5rem; border: 2px dashed #ddd; text-align: center; }
.mock-payment p { font-size: 0.85rem; color: #666; margin: 0.5rem 0; }

.order-box { background: #f9f9f9; padding: 2.5rem; border-radius: 0.5rem; position: sticky; top: 120px; }
.order-box h3 { font-family: 'Outfit', sans-serif; font-weight: 800; margin-bottom: 2rem; }

.mini-items { margin-bottom: 2rem; }
.mini-item { display: flex; gap: 1rem; margin-bottom: 1rem; align-items: center; }
.mini-item img { width: 50px; aspect-ratio: 1; object-fit: cover; }
.m-name { font-size: 0.8rem; font-weight: 700; margin: 0; }
.m-price { font-size: 0.75rem; color: #999; margin: 0; }

.totals { padding-top: 1.5rem; border-top: 1px solid #eee; }
.t-row { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.75rem; }
.t-row.grand { font-weight: 800; font-size: 1.2rem; margin-top: 1rem; }

.place-order-btn { width: 100%; padding: 1.5rem; background: #1e3a8a; color: white; border: none; font-weight: 800; font-size: 1rem; letter-spacing: 2px; cursor: pointer; margin-top: 2rem; }

.success-screen { text-align: center; padding: 10rem 0; }
.success-screen .icon { font-size: 4rem; display: block; margin-bottom: 2rem; }
.primary-btn { display: inline-block; padding: 1.25rem 3rem; background: #111; color: white; text-decoration: none; font-weight: 800; margin-top: 2rem; }

.loading-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.9); z-index: 1000; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.spinner { width: 40px; height: 40px; border: 4px solid #eee; border-top-color: #111; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
