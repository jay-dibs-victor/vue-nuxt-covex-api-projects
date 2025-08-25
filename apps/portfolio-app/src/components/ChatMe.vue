<template>
  <div>
    <!-- Floating Chat Button -->
    <button
      @click="toggleChat"
      class="fixed bottom-6 right-6 bg-white  text-white p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110"
    >
      💬
    </button>

    <!-- Chat Box -->
    <transition name="slide-up">
      <div
        v-if="isOpen"
        class="fixed bottom-20 right-6 w-80 bg-gray-300 shadow-2xl rounded-2xl p-4 flex flex-col border border-gray-200"
      >
        <!-- Header -->
        <div class="flex justify-between items-center border-b pb-2 mb-3">
          <h3 class="text-lg font-semibold text-gray-700">Contact Us</h3>
          <button @click="toggleChat" class="text-gray-500 hover:text-red-500">
            ✖
          </button>
        </div>
        <div class="flex-1 overflow-y-auto mb-3">
          <p class="text-sm text-gray-600 mb-2">
            Hi 👋 How can we help you today?
          </p>
          <!-- Example messages -->
          <div class="bg-gray-100 p-2 rounded-md mb-2 text-sm">
            Please enter your message below.
          </div>
        </div>

        <!-- Input -->
        <div class="flex items-center gap-2">
          <input
            v-model="message"
            type="text"
            placeholder="Type your message..."
            class="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            @click="sendMessage"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const message = ref("");

function toggleChat() {
  isOpen.value = !isOpen.value;
}

function sendMessage() {
  if (message.value.trim() !== "") {
    alert(`Message sent: ${message.value}`);
    message.value = "";
  }
}
</script>

<style>
.fixed{position:fixed}
.bottom-6{
    bottom: 6rem;
}

.bottom-20{
    bottom: 15rem;
}

.right-6{ right:6rem}
/* Transition for chat box */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
