<template>
  <div class="container account-page">
    <div v-if="isLoggedIn" class="account-layout">
      <aside class="account-nav">
        <h3>MY ACCOUNT</h3>
        <button class="active">Profile Settings</button>
        <button @click="router.push('/orders')">Order History</button>
        <button @click="handleLogout">Log Out</button>
      </aside>

      <div class="account-main">
        <section class="account-section">
          <h2>PROFILE SETTINGS</h2>
          <form @submit.prevent="saveProfile">
            <div class="form-row">
              <div class="input-group">
                <label>FULL NAME</label>
                <input v-model="profile.name" type="text" />
              </div>
            </div>
            <div class="form-row">
              <div class="input-group">
                <label>EMAIL ADDRESS</label>
                <input :value="currentUser.email" type="email" disabled />
                <span class="hint">Email cannot be changed</span>
              </div>
            </div>
            <button type="submit" class="save-btn" :disabled="saving">
              {{ saving ? 'SAVING...' : 'SAVE CHANGES' }}
            </button>
          </form>
        </section>

        <section class="account-section">
          <h2>SAVED ADDRESS</h2>
          <form @submit.prevent="saveAddress">
            <div class="form-row">
              <div class="input-group">
                <label>ADDRESS LINE 1</label>
                <input v-model="address.line1" type="text" />
              </div>
            </div>
            <div class="form-row col-2">
              <div class="input-group">
                <label>CITY</label>
                <input v-model="address.city" type="text" />
              </div>
              <div class="input-group">
                <label>ZIP CODE</label>
                <input v-model="address.zip" type="text" />
              </div>
            </div>
            <button type="submit" class="save-btn" :disabled="savingAddr">
              {{ savingAddr ? 'SAVING...' : 'UPDATE ADDRESS' }}
            </button>
          </form>
        </section>
      </div>
    </div>

    <div v-else class="not-logged-in">
      <h1>PLEASE LOG IN</h1>
      <p>Access your profile and order history by logging in to your account.</p>
      <button @click="openAuth" class="login-btn">LOG IN NOW</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const { currentUser, isLoggedIn, openAuth, logout, updateProfile } = useAuth()
const router = useRouter()

const saving = ref(false)
const savingAddr = ref(false)

const profile = reactive({
  name: currentUser.value?.name || ''
})

const address = reactive({
  line1: currentUser.value?.address?.line1 || '',
  city: currentUser.value?.address?.city || '',
  zip: currentUser.value?.address?.zip || ''
})

const saveProfile = async () => {
  saving.value = true
  await updateProfile({ name: profile.name })
  saving.value = false
  window.$toast?.add('Profile updated successfully!')
}

const saveAddress = async () => {
  savingAddr.value = true
  await updateProfile({ address: { ...currentUser.value?.address, ...address } })
  savingAddr.value = false
  window.$toast?.add('Address updated successfully!')
}

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<style scoped>
.account-page { padding: 6rem 0; min-height: 80vh; }
.account-layout { display: grid; grid-template-columns: 250px 1fr; gap: 5rem; }

.account-nav h3 { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 0.9rem; letter-spacing: 1px; margin-bottom: 2rem; }
.account-nav button { display: block; width: 100%; text-align: left; background: none; border: none; padding: 1rem 0; font-weight: 700; font-size: 0.85rem; color: #999; cursor: pointer; border-bottom: 1px solid #f9f9f9; }
.account-nav button.active { color: #111; }

.account-section { margin-bottom: 5rem; max-width: 600px; }
.account-section h2 { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.25rem; margin-bottom: 2rem; }

.form-row { margin-bottom: 1.5rem; }
.form-row.col-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.input-group label { display: block; font-size: 0.7rem; font-weight: 800; margin-bottom: 0.5rem; }
.input-group input { width: 100%; padding: 1rem; border: 1px solid #eee; border-radius: 0.5rem; font-size: 0.95rem; }
.hint { display: block; margin-top: 0.5rem; font-size: 0.7rem; color: #999; }

.save-btn { padding: 1rem 2rem; background: #111; color: white; border: none; font-weight: 800; font-size: 0.8rem; letter-spacing: 1px; cursor: pointer; margin-top: 1rem; }

.not-logged-in { text-align: center; padding: 10rem 0; }
.login-btn { padding: 1.25rem 3rem; background: #111; color: white; border: none; font-weight: 800; cursor: pointer; margin-top: 2rem; }
</style>
