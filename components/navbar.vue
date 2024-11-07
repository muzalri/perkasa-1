<template>
  <nav :class="['bg-white py-4 px-6 fixed w-full top-0 z-50 transition-transform duration-300', { 'transform -translate-y-full': isHidden }]">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <!-- <h1 class="text-2xl font-bold">PERKASA</h1> -->
        <nuxt-link to ="/dashboard"class="text-2xl font-bold"
        >PERKASA
        </nuxt-link>
      </div>

      <!-- Menu Items -->
      <div class="hidden md:flex items-center justify-center space-x-8 flex-grow">
        <a href="#" class="text-black hover:text-gray-600">Komunitas</a>
        <nuxt-link to="/konsultasi" class="text-black hover:text-gray-600">
          Konsultasi
        </nuxt-link>
        <nuxt-link to="/panduan" class="text-black hover:text-gray-600">
          Panduan
        </nuxt-link>
        <a href="#" class="text-black hover:text-gray-600">Brands</a>
      </div>

      <!-- Right Side Icons -->
      <div class="flex items-center space-x-4">
        <!-- Profile Button -->
        <button class="p-2 hover:bg-gray-700 rounded-full bg-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        <!-- Dark Mode Toggle -->
        <button class="p-2 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
name: 'Navbar',
data() {
  return {
    lastScrollY: 0,
    isHidden: false,
  };
},
mounted() {
  window.addEventListener('scroll', this.handleScroll);
},
beforeDestroy() {
  window.removeEventListener('scroll', this.handleScroll);
},
methods: {
  handleScroll() {
    if (window.scrollY > this.lastScrollY) {
      this.isHidden = true; // Scroll down
    } else {
      this.isHidden = false; // Scroll up
    }
    this.lastScrollY = window.scrollY;
  },
},
};
</script>

<style>
.transform {
transition: transform 0.3s ease;
}
</style>