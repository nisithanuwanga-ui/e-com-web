<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '../types';

const route = useRoute();
const product = ref<Product | null>(null);
const isLoading = ref(true);

onMounted(async () => {
    try {
        // We grab the specific ID from the web address
        const productId = route.params.id;
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        product.value = data;
    } catch (error) {
        console.error("Error fetching product details:", error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div v-if="isLoading" class="text-center py-20 text-gray-400 text-xl font-light">
        Loading product details...
    </div>

    <div v-else-if="product" class="max-w-5xl mx-auto pt-10">
        <router-link to="/"
            class="text-blue-500 hover:text-blue-700 text-sm font-medium mb-12 inline-block transition-colors">
            &larr; Back to Store
        </router-link>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div class="bg-white rounded-3xl p-10 shadow-sm flex justify-center items-center h-[500px]">
                <img :src="product.thumbnail" :alt="product.title"
                    class="max-h-full object-contain mix-blend-multiply drop-shadow-xl hover:scale-105 transition-transform duration-500">
            </div>

            <div>
                <h3 class="text-sm font-semibold text-orange-500 mb-2 uppercase tracking-widest">{{ product.category }}
                </h3>
                <h1 class="text-5xl font-semibold tracking-tight text-gray-900 mb-4">{{ product.title }}</h1>
                <p class="text-2xl font-light text-gray-500 mb-6">${{ product.price }}</p>

                <p class="text-lg text-gray-600 leading-relaxed mb-10 border-t border-gray-200 pt-6">
                    {{ product.description }}
                </p>

                <button
                    class="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-colors shadow-md hover:shadow-lg">
                    Add to Bag
                </button>
            </div>
        </div>
    </div>
</template>