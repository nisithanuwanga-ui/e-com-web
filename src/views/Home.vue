<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Product } from '../types';

const products = ref<Product[]>([]);
const isLoading = ref(true);
const searchQuery = ref('');

onMounted(async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        products.value = data.products;
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        isLoading.value = false;
    }
});

const filteredProducts = computed(() => {
    return products.value.filter(product =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
</script>

<template>
    <div>
        <div class="mb-12 text-center max-w-2xl mx-auto">
            <h1 class="text-5xl font-semibold tracking-tight mb-8">The latest. <span
                    class="text-gray-400 font-normal">Take a look at what's new right now.</span></h1>

            <input v-model="searchQuery" type="text" placeholder="Search products..."
                class="w-full px-6 py-4 bg-white border-none rounded-2xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow">
        </div>

        <div v-if="isLoading" class="text-center py-20 text-gray-400 text-xl font-light">
            Loading the store...
        </div>

        <router-link v-for="product in filteredProducts" :key="product.id" :to="`/product/${product.id}`"
            class="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center group">
            <h3 class="text-sm font-semibold text-orange-500 mb-1 uppercase tracking-wider">{{ product.category }}</h3>
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">{{ product.title }}</h2>
            <p class="text-lg font-light text-gray-500 mb-6">${{ product.price }}</p>

            <div
                class="h-48 w-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-105">
                <img :src="product.thumbnail" :alt="product.title" class="max-h-full object-contain mix-blend-multiply">
            </div>
        </router-link>
    </div>
</template>