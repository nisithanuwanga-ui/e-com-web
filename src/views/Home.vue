<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Product } from '../types';

const products = ref<Product[]>([]);
const isLoading = ref(true);
const searchQuery = ref('');

onMounted(async () => {
    try {
        // 1. Define all the tech categories I want in my store
        const techCategories = ['laptops', 'smartphones', 'tablets', 'mobile-accessories'];

        // 2. Ask the API for all these categories at the exact same time
        const fetchPromises = techCategories.map(category =>
            fetch(`https://dummyjson.com/products/category/${category}`).then(res => res.json())
        );

        // 3. Wait for all the data to arrive
        const results = await Promise.all(fetchPromises);

        // 4. Combine all the separate category arrays into one massive store inventory
        const allTechProducts = results.flatMap(data => data.products);

        // 5. Shuffle the array slightly so laptops and phones are mixed together
        products.value = allTechProducts.sort(() => Math.random() - 0.5);

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
        <div class="pt-20 pb-20 text-center max-w-4xl mx-auto px-4">
            <h1 class="text-6xl md:text-7xl font-semibold tracking-tight text-gray-900 mb-6">
                Pro power. <br class="hidden md:block" />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">Pure
                    brilliance.</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-500 font-light mb-12">The most advanced tech lineup ever. Ready for
                whatever's next.</p>

            <div class="max-w-2xl mx-auto relative group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6 absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input v-model="searchQuery" type="text"
                    placeholder="Search Laptops, iPhones, iPads, and Accessories..."
                    class="w-full pl-16 pr-6 py-5 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-sm hover:shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400">
            </div>
        </div>

        <div v-if="isLoading" class="text-center py-20 text-gray-400 text-xl font-light">
            Loading the ecosystem...
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <router-link v-for="product in filteredProducts" :key="product.id" :to="`/product/${product.id}`"
                class="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col items-center text-center group">
                <h3 class="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{{
                    product.category.replace('-', ' ') }}</h3>
                <h2 class="text-2xl font-semibold text-gray-900 mb-2 line-clamp-1">{{ product.title }}</h2>
                <p class="text-lg font-light text-gray-500 mb-8">${{ product.price }}</p>

                <div
                    class="h-48 w-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                    <img :src="product.thumbnail" :alt="product.title"
                        class="max-h-full object-contain drop-shadow-md mix-blend-multiply">
                </div>
            </router-link>
        </div>
    </div>
</template>