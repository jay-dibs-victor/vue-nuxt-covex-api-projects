<template>
  <div class="container">
    <h1 class="text-3xl font-bold mb-6">Contact Me</h1>
    <form @submit.prevent="handleSubmit" class="space-y-4 max-w-lg">
      <input v-model="form.name" type="text" placeholder="Your Name" required class="w-full p-3 rounded border" />
      <input v-model="form.email" type="email" placeholder="Your Email" required class="w-full p-3 rounded border" />
      <textarea v-model="form.message" placeholder="Your Message" rows="5" class="w-full p-3 rounded border"></textarea>
      <button type="submit" class="btn w-full">Send</button>
    </form>

    <div class="mt-10">
      <h2 class="text-xl font-semibold mb-2">Social</h2>
      <p>Email: {{ contact.email }}</p>
      <p>Phone: {{ contact.phone }}</p>
      <p>
        <a :href="contact.social.linkedin" target="_blank">LinkedIn</a> |
        <a :href="contact.social.github" target="_blank">GitHub</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import contact from '../data/contact.json'
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  alert(`Message Sent!\nName: ${form.value.name}\nEmail: ${form.value.email}`)
  //Todo: Optionally integrate EmailJS/Formspree for real email sending
  form.value = { name: '', email: '', message: '' }
}
</script>
