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
                    class="text-white py-2 px-4 rounded flex items-center justify-center"
                >
                    <img src="~/assets/images/scroll down.png" alt="Scroll Down" class="w-16 h-16" />
                </button>
            </div>
        </div>

        <div id="blue-section" class="w-full h-screen mt-20 bg-perkasa-blue flex flex-col">
            <div class="flex-grow flex items-center justify-center">
                <img src="~/assets/images/logo.png" alt="Gambar 1" class="w-20 h-20" />
            </div>
            <div class="border-t-2 border-white my-4"></div>
            <div class="flex-grow flex items-center justify-center">
                <img src="~/assets/images/logo.png" alt="Gambar 2" class="w-20 h-20" />
            </div>
            <div class="border-t-2 border-white my-4"></div>
            <div class="flex-grow flex items-center justify-center">
                <img src="~/assets/images/logo.png" alt="Gambar 3" class="w-20 h-20" />
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
            const blueSection = document.getElementById('blue-section');
            if (blueSection) {
                blueSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

