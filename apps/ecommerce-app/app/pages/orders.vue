<template>
  <div class="container orders-page">
    <h1>MY ORDERS</h1>
    <p v-if="orders?.length > 0">Track your current and past orders here.</p>

    <div v-if="loading" class="loading">Loading orders...</div>
    
    <div v-else-if="orders?.length > 0" class="orders-list">
      <div v-for="order in orders" :key="order._id" class="order-card">
        <div class="order-header">
          <div class="h-group">
            <span class="label">ORDER PLACED</span>
            <span class="val">{{ new Date(order.createdAt).toLocaleDateString() }}</span>
          </div>
          <div class="h-group">
            <span class="label">TOTAL</span>
            <span class="val">${{ order.total.toFixed(2) }}</span>
          </div>
          <div class="h-group">
            <span class="label">STATUS</span>
            <span class="status-badge" :class="order.status">{{ order.status.toUpperCase() }}</span>
          </div>
          <div class="order-id">#{{ order._id.slice(-8).toUpperCase() }}</div>
        </div>

        <div class="order-body">
          <div v-for="(item, idx) in order.items" :key="idx" class="order-item">
            <img :src="item.image" :alt="item.name" />
            <div class="oi-info">
              <h4>{{ item.name.toUpperCase() }}</h4>
              <p>Size: {{ item.size }} | Color: {{ item.color }} | Qty: {{ item.quantity }}</p>
              <span class="oi-price">${{ item.price.toFixed(2) }}</span>
            </div>
            <NuxtLink :to="`/product/${item.productId}`" class="reorder-btn">BUY AGAIN</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-orders">
      <span class="icon">📦</span>
      <h3>NO ORDERS YET</h3>
      <p>You haven't placed any orders with Velocity Active yet.</p>
      <NuxtLink to="/" class="shop-btn">START SHOPPING</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '~/composables/useCart'
import { useConvexQuery } from '~/composables/useConvex'

const { sessionId } = useCart()
const { data: orders, loading } = useConvexQuery('api/orders:getOrders', { sessionId: sessionId.value })
</script>

<style scoped>
.orders-page { padding: 6rem 0; min-height: 80vh; }
h1 { font-family: 'Outfit', sans-serif; font-weight: 800; margin-bottom: 0.5rem; }
.orders-page p { color: #666; margin-bottom: 4rem; }

.orders-list { display: flex; flex-direction: column; gap: 3rem; }
.order-card { border: 1px solid #eee; border-radius: 0.5rem; overflow: hidden; }

.order-header { display: flex; gap: 3rem; padding: 1.5rem 2rem; background: #f9f9f9; border-bottom: 1px solid #eee; }
.h-group { display: flex; flex-direction: column; gap: 0.25rem; }
.label { font-size: 0.65rem; font-weight: 800; color: #999; letter-spacing: 0.5px; }
.val { font-size: 0.85rem; font-weight: 700; }
.order-id { margin-left: auto; font-size: 0.75rem; font-weight: 800; color: #999; }

.status-badge { font-size: 0.65rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 1rem; width: fit-content; }
.status-badge.pending { background: #fef9c3; color: #854d0e; }
.status-badge.processing { background: #dcfce7; color: #166534; }

.order-body { padding: 2rem; }
.order-item { display: flex; gap: 1.5rem; align-items: center; margin-bottom: 2rem; }
.order-item:last-child { margin-bottom: 0; }
.order-item img { width: 80px; aspect-ratio: 1; object-fit: cover; background: #f7f7f7; }
.oi-info h4 { font-size: 0.85rem; font-weight: 800; margin: 0 0 0.25rem 0; }
.oi-info p { font-size: 0.75rem; color: #999; margin: 0 0 0.5rem 0; }
.oi-price { font-weight: 700; font-size: 0.9rem; }

.reorder-btn { margin-left: auto; padding: 0.75rem 1.5rem; background: white; border: 1px solid #eee; text-decoration: none; font-size: 0.75rem; font-weight: 800; transition: border-color 0.2s; }
.reorder-btn:hover { border-color: #111; }

.empty-orders { text-align: center; padding: 6rem 0; }
.empty-orders .icon { font-size: 3rem; display: block; margin-bottom: 1rem; opacity: 0.2; }
.shop-btn { display: inline-block; margin-top: 2rem; padding: 1rem 2.5rem; background: #111; color: white; text-decoration: none; font-weight: 800; }
</style>
