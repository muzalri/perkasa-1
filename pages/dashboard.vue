<template>
  <div>
    <!-- Hero Section -->
    <div class="mt-15 p-5 pt-20 px-20 h-screen bg-dark-green text-white flex flex-col">
      <div class="flex-grow flex items-center justify-between px-20">
        <div class="flex-1">
          <h1 class="text-5xl font-extrabold leading-tight">
            Belajar Berternak Ikan Mulai dari Sekarang!
          </h1>
          <p class="text-lg mt-4 mb-8 text-gray-300">
            Belajar berternak ikan secara mudah, efektif, dan aman. Diawasi pakar mulai dari Rp. 49.999
          </p>
          <button class="bg-white text-dark-green px-6 py-3 rounded-full shadow-md flex items-center space-x-2 hover:shadow-lg">
            <span>Mulai Menjelajah</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <img
          src="~/assets/images/scrolldown.png"
          alt="Scroll Down"
          class="w-12 h-12 cursor-pointer hover:opacity-80"
          @click="scrollToFeatured"
        />
      </div>
    </div>

    <!-- Featured Listings Section -->
    <section id="featured-listings" class="mt-20 px-10 mb-20">
      <h2 class="text-4xl font-bold text-dark-green mb-8 ml-20">Featured Listings</h2>
      
      <!-- Container Utama -->
      <div class="space-y-8">
        <!-- Card 1 -->
        <div class="flex items-center justify-between rounded-lg drop-shadow-2xl p-4 bg-white max-w-3xl mx-auto">
          <div class="flex items-center">
            <img src="~/assets/images/logo.png" alt="Pine Estates" class="w-16 h-16 rounded-lg shadow-lg object-cover mr-4" />
            <div>
              <h3 class="text-2xl font-bold text-orange-500">Pine Estates</h3>
              <p class="text-gray-500 text-sm mt-2">Lorem ipsum dolor sit amet...</p>
              <p class="text-xl font-bold text-dark-green mt-4">$180,000 <span class="text-sm text-gray-500">/Monthly</span></p>
            </div>
          </div>
          <!-- Informasi Tambahan -->
          <div class="text-right">
            <p class="text-sm text-gray-800">konsultasi dengan pakar blablablablablabla</p>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-300"></div>

        <!-- Card 2 -->
        <div class="flex items-center justify-between rounded-lg drop-shadow-2xl p-4 bg-white max-w-3xl mx-auto">
          <div class="flex items-center">
            <img src="~/assets/images/logo.png" alt="Pine Estates" class="w-16 h-16 rounded-lg shadow-lg object-cover mr-4" />
            <div>
              <h3 class="text-2xl font-bold text-orange-500">Pine Estates</h3>
              <p class="text-gray-500 text-sm mt-2">Lorem ipsum dolor sit amet...</p>
              <p class="text-xl font-bold text-dark-green mt-4">$180,000 <span class="text-sm text-gray-500">/Monthly</span></p>
            </div>
          </div>
          <!-- Informasi Tambahan -->
          <div class="text-right">
            <p class="text-sm text-gray-800">Available Now</p>
            <p class="text-sm text-gray-800">Contact: 123-456-7890</p>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-300"></div>

        <!-- Card 3 -->
        <div class="flex items-center justify-between rounded-lg drop-shadow-2xl p-4 bg-white max-w-3xl mx-auto">
          <div class="flex items-center">
            <img src="~/assets/images/logo.png" alt="Pine Estates" class="w-16 h-16 rounded-lg shadow-lg object-cover mr-4" />
            <div>
              <h3 class="text-2xl font-bold text-orange-500">Pine Estates</h3>
              <p class="text-gray-500 text-sm mt-2">Lorem ipsum dolor sit amet...</p>
              <p class="text-xl font-bold text-dark-green mt-4">$180,000 <span class="text-sm text-gray-500">/Monthly</span></p>
            </div>
          </div>
          <!-- Informasi Tambahan -->
          <div class="text-right">
            <p class="text-sm text-gray-800">Available Now</p>
            <p class="text-sm text-gray-800">Contact: 123-456-7890</p>
          </div>
        </div>
      </div>

    </section>

    <!-- Footer Section -->
    <footer class="bg-dark-green text-white py-10">
      <div class="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-2xl font-bold mb-4">Perkasa</h3>
          <p class="text-gray-400 text-sm mb-4">Copyright © 2020 Perkasa<br />All rights reserved</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  middleware: ['auth'],
  methods: {
    scrollToFeatured() {
      const featured = document.getElementById('featured-listings');
      if (featured) {
        featured.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.error("Element with ID 'featured-listings' not found.");
      }
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

html {
  font-family: 'Plus Jakarta Sans';
}

.custom-rounded {
  border-radius: 70px;
}

.animated-image {
  animation: scaleIn 1s forwards;
}

@keyframes scaleIn {
  0% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

