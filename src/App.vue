<script setup lang="ts">
import { cartCount } from './store/cart';
</script>

<template>
  <div class="min-h-screen bg-[#fbfbfd] font-sans text-[#1d1d1f] flex flex-col">

    <header class="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-semibold tracking-tight">
          E-Nexus<span class="text-gray-400">.lk</span>
        </router-link>

        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <router-link to="/" class="hover:text-black transition-colors">Laptops</router-link>
          <router-link to="/" class="hover:text-black transition-colors">Mobiles</router-link>
          <router-link to="/" class="hover:text-black transition-colors">Tablets</router-link>
          <router-link to="/" class="hover:text-black transition-colors">Accessories</router-link>

          <div class="h-4 w-px bg-gray-300"></div>
          <router-link to="/login" class="text-blue-600 hover:text-blue-800 transition-colors">Sign In</router-link>

          <router-link to="/cart"
            class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-full font-semibold transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {{ cartCount }}
          </router-link>
        </nav>
      </div>
    </header>

    <main class="flex-grow max-w-7xl mx-auto px-6 w-full">
      <router-view />
    </main>

    <footer class="bg-[#f5f5f7] border-t border-gray-200 mt-20 text-xs text-gray-500 font-light py-10">
      <div class="max-w-7xl mx-auto px-6">
        <p class="mb-4">Prices are inclusive of VAT. Free delivery on all orders over $50.</p>
        <div class="border-t border-gray-300 my-4"></div>
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Copyright © 2026 Store Inc. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-gray-800 transition-colors">Privacy Policy</a>
            <div class="w-px bg-gray-300"></div>
            <a href="#" class="hover:text-gray-800 transition-colors">Terms of Use</a>
            <div class="w-px bg-gray-300"></div>
            <a href="#" class="hover:text-gray-800 transition-colors">Sales Policy</a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>