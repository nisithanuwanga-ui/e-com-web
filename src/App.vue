<script setup lang="ts">
import { cartCount } from './store/cart';
</script>

<template>
  <div class="min-h-screen bg-[#fbfbfd] font-sans text-[#1d1d1f]">

    <header class="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-semibold tracking-tight">
          Store<span class="text-gray-400">.</span>
        </router-link>

        <nav class="flex items-center gap-8 text-sm font-medium text-gray-500">
          <router-link to="/" class="hover:text-black transition-colors">Mac</router-link>
          <router-link to="/" class="hover:text-black transition-colors">iPad</router-link>
          <router-link to="/" class="hover:text-black transition-colors">iPhone</router-link>

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

    <main class="max-w-7xl mx-auto px-6 py-12">
      <router-view />
    </main>

  </div>
</template>