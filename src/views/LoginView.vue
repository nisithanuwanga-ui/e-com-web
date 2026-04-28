<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('emilys'); // Pre-filled for easy testing!
const password = ref('emilyspass');
const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                expiresInMins: 60, // VIP pass lasts for 60 minutes
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Invalid credentials');
        }

        // Success! Save the VIP token to the browser's memory
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data));

        // Redirect the user back to the store
        router.push('/');

    } catch (error: any) {
        errorMessage.value = error.message;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="min-h-[70vh] flex flex-col items-center justify-center px-6">

        <div class="text-center mb-10">
            <h1 class="text-4xl font-semibold tracking-tight text-gray-900 mb-2">Sign in.</h1>
            <p class="text-gray-500 font-light text-lg">Enter your details to access your account.</p>
        </div>

        <div class="w-full max-w-sm">
            <form @submit.prevent="handleLogin"
                class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-5">

                <div v-if="errorMessage" class="bg-red-50 text-red-500 text-sm p-3 rounded-xl text-center">
                    {{ errorMessage }}
                </div>

                <div>
                    <label
                        class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">Username</label>
                    <input v-model="username" type="text"
                        class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-gray-900"
                        required>
                </div>

                <div>
                    <label
                        class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">Password</label>
                    <input v-model="password" type="password"
                        class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-gray-900"
                        required>
                </div>

                <button type="submit" :disabled="isLoading"
                    class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 rounded-2xl transition-colors mt-2">
                    {{ isLoading ? 'Signing in...' : 'Sign In' }}
                </button>
            </form>
        </div>

    </div>
</template>