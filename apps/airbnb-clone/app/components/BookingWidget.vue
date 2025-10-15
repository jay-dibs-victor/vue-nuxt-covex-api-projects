<template>
  <div class="booking-widget">
    <div class="price-header">
      <div class="price">
        <span class="amount">${{ property.price }}</span>
        <span class="per-night">night</span>
      </div>
      <div class="rating-info">
        <span>★ {{ property.rating }}</span>
      </div>
    </div>

    <div class="booking-form">
      <div class="date-inputs">
        <div class="date-field">
          <label>CHECK-IN</label>
          <input type="date" v-model="dates.start" />
        </div>
        <div class="date-field">
          <label>CHECKOUT</label>
          <input type="date" v-model="dates.end" />
        </div>
      </div>
      
      <div class="guests-input">
        <label>GUESTS</label>
        <select v-model="guests">
          <option :value="1">1 guest</option>
          <option :value="2">2 guests</option>
          <option :value="3">3 guests</option>
          <option :value="4">4 guests</option>
        </select>
      </div>
    </div>

    <button class="reserve-btn" @click="handleReserve" :disabled="loading">
      {{ loading ? 'Processing...' : 'Reserve' }}
    </button>
    
    <p class="charge-note">You won't be charged yet</p>

    <div class="price-calc" v-if="nights > 0">
      <div class="calc-row">
        <span>${{ property.price }} x {{ nights }} nights</span>
        <span>${{ basePrice }}</span>
      </div>
      <div class="calc-row">
        <span>StaySphere service fee</span>
        <span>$45</span>
      </div>
      <div class="divider"></div>
      <div class="total-row">
        <span>Total</span>
        <span>${{ basePrice + 45 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useConvexMutation } from '~/composables/useConvex';

const props = defineProps(['property']);
const emit = defineEmits(['success']);

const loading = ref(false);
const guests = ref(1);
const dates = reactive({
  start: '',
  end: ''
});

const nights = computed(() => {
  if (!dates.start || !dates.end) return 0;
  const start = new Date(dates.start);
  const end = new Date(dates.end);
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
});

const basePrice = computed(() => nights.value * props.property.price);

const userId = useCookie('airbnb_user_id');
const createBooking = useConvexMutation("bookings:createBooking");

const handleReserve = async () => {
  if (!userId.value) {
    alert("Please log in to reserve a stay.");
    return;
  }
  if (nights.value <= 0) {
    alert("Please select valid dates.");
    return;
  }

  loading.value = true;
  try {
    await createBooking({
      propertyId: props.property._id,
      userId: userId.value,
      startDate: dates.start,
      endDate: dates.end,
      totalAmount: basePrice.value + 45
    });
    alert("Booking confirmed!");
    emit('success');
  } catch (err) {
    alert("Failed to create booking: " + err.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.booking-widget {
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}

.price-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.amount {
  font-size: 1.5rem;
  font-weight: 700;
}

.per-night {
  font-size: 1rem;
  color: #717171;
  margin-left: 0.25rem;
}

.rating-info {
  font-size: 0.9rem;
  font-weight: 600;
}

.booking-form {
  border: 1px solid #b0b0b0;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.date-inputs {
  display: flex;
  border-bottom: 1px solid #b0b0b0;
}

.date-field {
  flex: 1;
  padding: 0.5rem 0.75rem;
}

.date-field:first-child {
  border-right: 1px solid #b0b0b0;
}

.date-field label, .guests-input label {
  display: block;
  font-size: 0.6rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
}

.date-field input {
  width: 100%;
  border: none;
  font-size: 0.85rem;
  outline: none;
}

.guests-input {
  padding: 0.5rem 0.75rem;
}

.guests-input select {
  width: 100%;
  border: none;
  font-size: 0.85rem;
  outline: none;
  background: transparent;
}

.reserve-btn {
  width: 100%;
  background: #ff385c;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1rem;
}

.reserve-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.charge-note {
  text-align: center;
  font-size: 0.85rem;
  color: #717171;
  margin-bottom: 1.5rem;
}

.price-calc {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #222;
}

.divider {
  height: 1px;
  background: #ebebeb;
  margin: 0.5rem 0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.1rem;
}
</style>
