import { ref, computed } from 'vue';
import { useConvexMutation } from './useConvex';
import { getConvexClient } from './useConvex';

interface AuthUser {
  _id: string;
  email: string;
  name: string;
  address?: any;
}

const currentUser = ref<AuthUser | null>(null);
const isAuthOpen = ref(false);
const authError = ref('');
const authLoading = ref(false);

// Simple hash (base64 + salt) — for demo/showcase purposes
function hashPassword(password: string): string {
  return btoa('ec_salt:' + password);
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Load saved user from localStorage on init
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('ec_user');
  if (saved) {
    try { currentUser.value = JSON.parse(saved); } catch { /* ignore */ }
  }
}

export function useAuth() {
  const isLoggedIn = computed(() => !!currentUser.value);

  const createUserMut = useConvexMutation('users:createUser');
  const updateProfileMut = useConvexMutation('users:updateProfile');

  const register = async (email: string, name: string, password: string) => {
    authLoading.value = true;
    authError.value = '';
    try {
      const id = await createUserMut({
        email,
        name,
        passwordHash: hashPassword(password),
      });
      const user: AuthUser = { _id: id as string, email, name };
      currentUser.value = user;
      localStorage.setItem('ec_user', JSON.stringify(user));
      isAuthOpen.value = false;
    } catch (err: any) {
      authError.value = err.message ?? 'Registration failed';
    } finally {
      authLoading.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    authLoading.value = true;
    authError.value = '';
    try {
      const convex = getConvexClient();
      if (!convex) throw new Error('Client not ready');
      const user = await convex.query('users:getUserByEmail' as any, { email });
      if (!user) throw new Error('No account found for that email');
      if (!verifyPassword(password, user.passwordHash)) throw new Error('Incorrect password');
      const authUser: AuthUser = { _id: user._id, email: user.email, name: user.name, address: user.address };
      currentUser.value = authUser;
      localStorage.setItem('ec_user', JSON.stringify(authUser));
      isAuthOpen.value = false;
    } catch (err: any) {
      authError.value = err.message ?? 'Login failed';
    } finally {
      authLoading.value = false;
    }
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem('ec_user');
  };

  const updateProfile = async (updates: { name?: string; address?: any }) => {
    if (!currentUser.value) return;
    await updateProfileMut({ userId: currentUser.value._id, ...updates });
    currentUser.value = { ...currentUser.value, ...updates };
    localStorage.setItem('ec_user', JSON.stringify(currentUser.value));
  };

  const openAuth = () => { isAuthOpen.value = true; authError.value = ''; };
  const closeAuth = () => { isAuthOpen.value = false; authError.value = ''; };

  return {
    currentUser,
    isLoggedIn,
    isAuthOpen,
    authError,
    authLoading,
    register,
    login,
    logout,
    updateProfile,
    openAuth,
    closeAuth,
  };
}
