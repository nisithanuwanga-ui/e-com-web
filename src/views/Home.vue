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
        <div class="mb-16 text-center max-w-3xl mx-auto">
            <h1 class="text-5xl font-semibold tracking-tight mb-8 text-gray-900">The latest. <span
                    class="text-gray-400 font-normal">Take a look at what's new right now.</span></h1>

            <input v-model="searchQuery" type="text" placeholder="Search Mac, iPhone, iPad, and Accessories..."
                class="w-full px-6 py-4 bg-white/50 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all">
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