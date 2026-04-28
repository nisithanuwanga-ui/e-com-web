<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-[#fbfbfd] font-sans text-[#1d1d1f]">

    <header class="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-semibold tracking-tight">
          Store<span class="text-gray-400">.</span>
        </router-link>

        <nav class="flex gap-8 text-sm font-medium text-gray-500">
          <router-link to="/" class="hover:text-black transition-colors">Mac</router-link>
          <router-link to="/" class="hover:text-black transition-colors">iPad</router-link>
          <router-link to="/" class="hover:text-black transition-colors">iPhone</router-link>
        </nav>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-12">
      <router-view />
    </main>

  </div>
</template>