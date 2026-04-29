import { ref, computed } from 'vue';
import type { Product } from '../types';

// 1. The Global State (our empty bag)
export const cart = ref<Product[]>([]);

// 2. A computed property that automatically updates the total count
export const cartCount = computed(() => cart.value.length);

// 3. The action to add a product to the bag
export const addToCart = (product: Product) => {
  cart.value.push(product);
};