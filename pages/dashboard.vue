<template>
    <div class="mt-15 p-5 pt-20 px-20">
        <div class="relative w-full h-screen animated-image">

            <img 
                src="~/assets/images/ikan.png" 
                alt="Koi Fish" 
                class="inset-0 w-full h-3/4 object-cover custom-rounded"
            />
            <div class="absolute inset-0 flex items-end justify-start p-10">
                <h1 class="text-white text-4xl font-bold bg-black bg-opacity-50 p-4 rounded"
                style="position: absolute; transform: translateY(-200px); z-index: 1;">"Selamat Datang di Dashboard</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardPage',
    middleware: ['auth']
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

