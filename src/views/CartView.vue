<script setup lang="ts">
import { computed } from 'vue';
import { cart } from '../store/cart';

// Automatically calculate the total price
const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.price, 0);
});
</script>

<template>
    <div class="max-w-4xl mx-auto pt-10">
        <h1 class="text-4xl font-semibold tracking-tight text-gray-900 mb-10">Review your bag.</h1>

        <div v-if="cart.length === 0" class="text-center py-20">
            <h2 class="text-2xl font-light text-gray-500 mb-6">Your bag is empty.</h2>
            <router-link to="/"
                class="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium transition-colors">
                Continue Shopping
            </router-link>
        </div>

        <div v-else>
            <div class="space-y-6 mb-10">
                <div v-for="(item, index) in cart" :key="index"
                    class="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div class="flex items-center gap-6">
                        <div class="h-20 w-20 bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                            <img :src="item.thumbnail" :alt="item.title" class="max-h-full object-contain">
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">{{ item.title }}</h3>
                            <p class="text-sm text-gray-500">{{ item.category }}</p>
                        </div>
                    </div>
                    <div class="text-xl font-medium text-gray-900">${{ item.price }}</div>
                </div>
            </div>

            <div class="border-t border-gray-200 pt-8 flex flex-col items-end">
                <div class="flex justify-between w-full md:w-1/2 text-2xl font-semibold text-gray-900 mb-8">
                    <span>Total</span>
                    <span>${{ cartTotal.toFixed(2) }}</span>
                </div>
                <button
                    class="w-full md:w-1/2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-colors shadow-md">
                    Check Out
                </button>
            </div>
        </div>
    </div>
</template>