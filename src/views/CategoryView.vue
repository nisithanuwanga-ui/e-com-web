<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { Product } from '../types';

const categoryMeta = {
    laptops: {
        title: 'Laptop Collection',
        api: 'laptops',
        gradient: 'from-blue-600 via-cyan-500 to-sky-400',
        badge: 'bg-blue-100 text-blue-700',
        description: 'High-performance laptops built for focus, productivity, and everyday power.',
    },
    mobiles: {
        title: 'Mobile Collection',
        api: 'smartphones',
        gradient: 'from-purple-600 via-fuchsia-500 to-pink-500',
        badge: 'bg-purple-100 text-purple-700',
        description: 'Smartphones designed for speed, creativity, and all-day flexibility.',
    },
    tablets: {
        title: 'Tablet Collection',
        api: 'tablets',
        gradient: 'from-emerald-600 via-teal-500 to-cyan-500',
        badge: 'bg-emerald-100 text-emerald-700',
        description: 'Portable displays for work, study, and entertainment on the go.',
    },
    accessories: {
        title: 'Accessories',
        api: 'mobile-accessories',
        gradient: 'from-amber-500 via-orange-400 to-red-400',
        badge: 'bg-orange-100 text-orange-700',
        description: 'Complement your tech with everyday essentials that upgrade your setup.',
    },
} as const;

type CategoryKey = keyof typeof categoryMeta;

const props = defineProps<{
    categoryKey: CategoryKey;
}>();

const products = ref<Product[]>([]);
const isLoading = ref(true);

const currentCategory = computed(() => categoryMeta[props.categoryKey]);

const fetchCategoryProducts = async () => {
    isLoading.value = true;

    try {
        const response = await fetch(`https://dummyjson.com/products/category/${currentCategory.value.api}`);
        const data = await response.json();
        products.value = data.products || [];
    } catch (error) {
        console.error('Error fetching category products:', error);
        products.value = [];
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchCategoryProducts);
watch(() => props.categoryKey, fetchCategoryProducts);
</script>

<template>
    <div class="pt-12 pb-20">
        <div class="mb-10 rounded-[32px] bg-gradient-to-r p-[1px] shadow-sm" :class="currentCategory.gradient">
            <div class="rounded-[31px] bg-white/90 backdrop-blur-sm px-6 py-8 md:px-10 md:py-10">
                <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <p class="text-sm uppercase tracking-[0.25em] font-semibold mb-3 text-gray-500">Shop by category
                        </p>
                        <h1 class="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
                            {{ currentCategory.title }}
                        </h1>
                    </div>

                    <span class="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
                        :class="currentCategory.badge">
                        {{ products.length }} items
                    </span>
                </div>

                <p class="mt-5 max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed">
                    {{ currentCategory.description }}
                </p>
            </div>
        </div>

        <div v-if="isLoading" class="text-center py-20 text-gray-400 text-xl font-light">
            Loading {{ currentCategory.title.toLowerCase() }}...
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <router-link v-for="product in products" :key="product.id" :to="`/product/${product.id}`"
                class="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col items-center text-center group">
                <h3 class="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
                    {{ product.category.replace('-', ' ') }}
                </h3>
                <h2 class="text-2xl font-semibold text-gray-900 mb-2 line-clamp-1">
                    {{ product.title }}
                </h2>
                <p class="text-lg font-light text-gray-500 mb-8">${{ product.price }}</p>

                <div
                    class="h-48 w-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                    <img :src="product.thumbnail" :alt="product.title"
                        class="max-h-full object-contain drop-shadow-md mix-blend-multiply" />
                </div>
            </router-link>
        </div>
    </div>
</template>
