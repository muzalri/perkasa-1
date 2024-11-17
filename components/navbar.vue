<template>
  <nav :class="['bg-dark-green py-4 px-6 fixed w-full top-0 z-50 transition-transform duration-300', { 'transform -translate-y-full': isHidden }]">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <nuxt-link to="/dashboard" class="text-2xl text-white font-bold">PERKASA</nuxt-link>
      </div>

      <!-- Menu Items -->
      <div class="hidden md:flex items-center justify-center space-x-8 flex-grow">
        <NuxtLink
          to="/dashboard"
          class="relative text-white hover::content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/komunitas"
          class="relative text-white hover::content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Komunitas
        </NuxtLink>
        <nuxt-link
          to="/konsultasi"
          class="relative text-white hover::content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Konsultasi
        </nuxt-link>
        <nuxt-link
          to="/panduan"
          class="relative text-white hover::content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Panduan
        </nuxt-link>
      </div>

      <!-- Right Side Icons -->
      <div class="flex items-center space-x-4">
        <!-- Profile Button -->
        <NuxtLink 
          to="/profile" 
          class="p-2 hover:bg-gray-100 rounded-full bg-white transition-colors"
        >
          <div class="flex items-center space-x-2">
            <div class="relative">
              <img 
                v-if="$auth.user?.profile_photo"
                :src="getUserImage($auth.user.profile_photo)"
                class="h-8 w-8 rounded-full object-cover"
                alt="Profile Photo"
              />
              <svg 
                v-else
                xmlns="http://www.w3.org/2000/svg" 
                class="h-6 w-6 text-teal-800" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
            <span v-if="$auth.user" class="text-sm text-teal-800 font-medium hidden md:block">
              {{ $auth.user.name }}
            </span>
          </div>
        </NuxtLink>

        <!-- Dark Mode Toggle -->
        <button class="p-2 bg-white rounded-full hover:bg-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isHidden: false,
 
    };
  },
  methods: {
    toggleNavbar() {
      this.isHidden = !this.isHidden;
    },
    getUserImage(profilePath) {
      return profilePath
        ? `http://localhost:${this.imagePort}/storage/${profilePath}`
        : require('~/assets/images/anwar.png')
    }
  }
};
</script>