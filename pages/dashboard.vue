<template>
    <div class="mt-15 p-5 pt-20 px-20">
        <div class="relative w-full h-screen animated-image">

            <img 
                src="~/assets/images/ikan.png" 
                alt="Koi Fish" 
                class="inset-0 w-full h-full object-cover custom-rounded"
            />
            <div class="absolute bottom-20 left-10 text-white text-lg">Selamat Datang</div>
            <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <button 
                    @click="scrollToBlueSection" 
                    class="bg-teal-600 text-white py-2 px-4 rounded flex items-center justify-center"
                >
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
        </div>

        <div class="bg-blue-500 w-full h-screen mt-20"> <!-- Menambahkan mt-5 untuk memberikan jarak -->
          <div class="flex items-center justify-center h-full">
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardPage',
    middleware: ['auth'],
    methods: {
        scrollToBlueSection() {
            const blueSection = document.querySelector('.bg-blue-500');
            if (blueSection) {
                blueSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest', duration: 4000 });
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

