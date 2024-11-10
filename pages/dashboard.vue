<template>
    <div class="mt-15 p-5 pt-20 px-20 h-screen bg-dark-green text-white flex flex-col">
      <div class="flex-grow flex items-center justify-between px-20">
        <div class="flex-1">
          <h1 class="text-5xl font-extrabold leading-tight">
            Find the right and best home for your family
          </h1>
          <p class="text-lg mt-4 mb-8 text-gray-300">
            Discover the perfect place to call home with Homeifye. Explore our wide selection of properties designed for you and your family.
          </p>
          <button class="bg-white text-dark-green px-6 py-3 rounded-full shadow-md flex items-center space-x-2 hover:shadow-lg">
            <span>Start exploring</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <img
          src="~/assets/images/scrolldown.png"
          alt="Scroll Down"
          class="w-12 h-12 cursor-pointer hover:opacity-80"
          @click="scrollToSection"
        />
      </div>
    </div>
  
    <section id="new-listings" class="mt-20 px-10">
      <h2 class="text-4xl font-bold text-dark-green mb-8">New Listings</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Card 1 -->
        <div class="rounded-lg shadow-lg overflow-hidden">
          <img src="~/assets/images/scrolldown.png" alt="Pine Estates" class="w-full h-64 object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold text-dark-green">Pine Estates</h3>
            <p class="text-sm text-gray-500">222 Spruce Street, Springfield</p>
            <p class="text-lg font-bold text-orange-500">$180,000</p>
            <p class="text-sm text-gray-500">1000 Sq.Ft</p>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="rounded-lg shadow-lg overflow-hidden">
          <img src="~/assets/images/scrolldown.png" alt="Maple Grove" class="w-full h-64 object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold text-dark-green">Maple Grove</h3>
            <p class="text-sm text-gray-500">333 Cherry Lane, Springfield</p>
            <p class="text-lg font-bold text-orange-500">$400,000</p>
            <p class="text-sm text-gray-500">2200 Sq.Ft</p>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="rounded-lg shadow-lg overflow-hidden">
          <img src="~/assets/images/scrolldown.png" alt="Willow Heights" class="w-full h-64 object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold text-dark-green">Willow Heights</h3>
            <p class="text-sm text-gray-500">444 Ash Boulevard, Springfield</p>
            <p class="text-lg font-bold text-orange-500">$290,000</p>
            <p class="text-sm text-gray-500">1600 Sq.Ft</p>
          </div>
        </div>
      </div>
    </section>
</template>
<script>
export default {
    name: 'DashboardPage',
    middleware: ['auth'],
    methods: {
        scrollToSection() {
            const section = document.querySelector("#new-listings"); // Ganti #target-section dengan ID elemen tujuan
            section.scrollIntoView({ behavior: "smooth" });
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
    border-radius: 70px; /* Atur nilai sesuai kebutuhan */
}

.animated-image {
    animation: scaleIn 1s forwards; /* Menambahkan animasi */
}

@keyframes scaleIn {
    0% {
        transform: scale(1.5); /* Ukuran awal lebih besar */
    }
    100% {
        transform: scale(1); /* Ukuran akhir normal */
    }
}
</style>

