<template>
  <div class="body">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center relative py-8 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        <!-- Text Content -->
        <div class="text-center md:text-left md:w-1/2 mt-8 md:mt-0 md:ml-8 lg:ml-40">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-800 mb-4 leading-tight pt-8 sm:pt-10 md:pt-0">
            Belajar Berternak Ikan <br class="hidden sm:block" />
            <span class="text-teal-600">Mulai dari Sekarang!</span>
          </h2>
          <p class="text-gray-700 text-base sm:text-lg mb-6 px-4 md:px-0">
            Belajar beternak ikan secara mudah, efektif, dan aman. Diawasi pakar mulai dari
            <strong>Rp. 49.999</strong>.
          </p>
          <button class="mt-4 bg-teal-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded hover:bg-teal-700">
            Harga
          </button>
        </div>
        <!-- Image -->
        <div class="md:w-1/2 md:mr-8 lg:mr-40">
          <img 
            src="~/assets/images/peternak.png" 
            alt="Peternak Ikan" 
            class="w-64 sm:w-72 md:w-[400px] lg:w-[480px] mx-auto" 
          />
        </div>
      </div>
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10 -z-10">
        <img src="~/assets/images/pattern.png" alt="Background Pattern" class="w-full h-full object-cover" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto text-center">
        <h3 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Fitur Perkasa</h3>
        <p class="text-gray-600 mb-12 max-w-2xl mx-auto">
          Perkasa memiliki fitur-fitur yang dirancang khusus untuk memenuhi kebutuhan para pemula ikan yang ingin belajar membudidaya ikan!
        </p>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mx-4 sm:mx-6 lg:mx-20">
          <!-- Komunitas -->
          <NuxtLink 
            to="/komunitas" 
            class="bg-white p-6 sm:p-8 shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div class="mb-6">
              <img 
                src="~/assets/images/komunitas.png" 
                alt="Komunitas" 
                class="w-32 h-32 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto"
              />
            </div>
            <h4 class="font-bold text-xl text-teal-700 mb-3">Komunitas</h4>
            <p class="text-gray-600">Berbagi dengan pengguna lain di komunitas</p>
          </NuxtLink>

          <!-- Konsultasi -->
          <NuxtLink 
            to="/konsultasi" 
            class="bg-white p-6 sm:p-8 shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div class="mb-6">
              <img 
                src="~/assets/images/konsultasi.png" 
                alt="Konsultasi" 
                class="w-32 h-32 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto"
              />
            </div>
            <h4 class="font-bold text-xl text-teal-700 mb-3">Konsultasi</h4>
            <p class="text-gray-600">Bertanya kepada pakar secara langsung</p>
          </NuxtLink>

          <!-- Panduan -->
          <NuxtLink 
            to="/panduan" 
            class="bg-white p-6 sm:p-8 shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div class="mb-6">
              <img 
                src="~/assets/images/panduan.png" 
                alt="Panduan" 
                class="w-32 h-32 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto"
              />
            </div>
            <h4 class="font-bold text-xl text-teal-700 mb-3">Panduan</h4>
            <p class="text-gray-600">Dapatkan informasi tentang cara berternak ikan</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Mobile Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="flex justify-center order-2 md:order-1">
          <img 
            src="~/assets/images/mobile.png" 
            alt="Mobile App" 
            class="w-48 sm:w-64 md:w-80 lg:w-[500px] xl:w-[600px] transition-all duration-300" 
          />
        </div>
        <div class="text-center md:text-left order-1 md:order-2">
          <h3 class="text-2xl sm:text-3xl font-bold text-teal-800 mb-4">Hadir di Aplikasi Mobile!</h3>
          <p class="text-sm sm:text-base text-gray-600 mb-6">
            Dapatkan aplikasi kami di Google Play Store. Konsultasi dengan pakar, 
            berjelajah di Komunitas, dan belajar cara beternak ikan di Guidebook. 
            Sekarang hadir juga di Aplikasi Mobile!
          </p>
          <a href="#" class="inline-block">
            <img 
              src="~/assets/images/playstore.png" 
              alt="Google Play" 
              class="w-36 sm:w-48 md:w-56 hover:scale-105 transition-transform duration-300" 
            />
          </a>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto text-center">
        <h3 class="text-2xl sm:text-3xl font-bold mb-8 text-teal-800">Berkenalan dengan Kami!</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div 
            v-for="member in teamMembers" 
            :key="member.name" 
            class="bg-white shadow-lg rounded-[2rem] overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <!-- Image Container -->
            <div class="relative aspect-square">
              <img 
                :src="member.image" 
                :alt="member.name" 
                class="w-full h-full object-cover rounded-t-[2rem]"
              />
            </div>
            
            <!-- Content -->
            <div class="p-6">
              <h4 class="font-bold text-lg sm:text-xl text-teal-700">{{ member.name }}</h4>
              <p class="text-gray-600 text-sm sm:text-base mt-1 mb-4">{{ member.position }}</p>
              
              <!-- Social Icons -->
              <div class="flex justify-center items-center space-x-6">
                <a 
                  v-for="social in member.socials" 
                  :key="social.platform" 
                  :href="social.link" 
                  target="_blank" 
                  class="text-gray-500 hover:text-teal-600 text-xl transition-colors duration-300"
                >
                  <i :class="social.icon"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 min-h-screen">
      <div class="container mx-auto px-6 md:px-12 lg:px-20">
        <h3 class="text-3xl font-bold text-teal-800 mb-8 text-left">FAQ</h3>
        <div class="space-y-8 text-left text-gray-800">
          <div>
            <h4 class="font-bold text-lg">1. Apa itu aplikasi PERKASA?</h4>
            <p>
              PERKASA adalah platform digital yang dirancang untuk membantu anak muda Indonesia memulai bisnis budidaya ikan pangan dengan mudah. Aplikasi ini menyediakan berbagai fitur, termasuk pelatihan, konsultasi pakar, marketplace, monitoring usaha, dan komunitas.
            </p>
          </div>
          <div>
            <h4 class="font-bold text-lg">2. Siapa saja yang bisa menggunakan aplikasi PERKASA?</h4>
            <p>
              Aplikasi ini dirancang untuk: <br />
              <strong>Pemula</strong>: Orang awam yang baru ingin memulai budidaya ikan pangan. <br />
              <strong>Suplier</strong>: Penyedia bibit, pakan, dan alat budidaya. <br />
              <strong>Pakar Perikanan</strong>: Ahli yang memberikan konsultasi dan bimbingan. <br />
              <strong>Tenaga Kerja</strong>: Pekerja yang membantu operasional budidaya.
            </p>
          </div>
          <div>
            <h4 class="font-bold text-lg">3. Apa saja fitur utama aplikasi PERKASA?</h4>
            <p>
              <strong>Guide and Training</strong>: Pelatihan lengkap tentang budidaya ikan.<br />
              <strong>Autentikasi</strong>: Register, Login, Forgot Password untuk akses mudah dan aman.<br />
              <strong>Konsultasi Pakar</strong>: Akses ke pakar perikanan untuk bimbingan langsung.<br />
              <strong>Marketplace</strong>: Temukan dan beli bibit, pakan, dan kebutuhan lainnya.<br />
              <strong>Monitoring Usaha</strong>: Pantau kesehatan ikan dan manajemen stok pakan.<br />
              <strong>Komunitas</strong>: Terhubung dengan peternak lain untuk berbagi pengalaman dan tips.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-teal-800 text-white py-8">
      <div class="container mx-auto text-center">
        <p>Copyright &copy; 2020 Perkasa</p>
        <ul class="flex justify-center space-x-6 mt-4">
          <li><a href="#">About Us</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamMembers: [
        {
          name: 'Cahya',
          position: 'Ketua',
          image: require('@/assets/images/cahya.jpeg'),
          socials: [
            { platform: 'GitHub', link: 'https://github.com/cahyailhamketua', icon: 'fab fa-github' },
            { platform: 'Instagram', link: 'https://instagram.com/chyilhm', icon: 'fab fa-instagram' },
          ],
        },
        {
          name: 'Daffa Abiyya',
          position: 'Sekretaris',
          image: require('@/assets/images/cibe.png'),
          socials: [
            { platform: 'GitHub', link: 'https://github.com/Abiyya1', icon: 'fab fa-github' },
            { platform: 'Instagram', link: 'https://instagram.com/daffabiyya', icon: 'fab fa-instagram' },
          ],
      
        },
        {
          name: 'Algip',
          position: 'Bos',
          image: require('@/assets/images/algip.png'),
          socials: [
            { platform: 'GitHub', link: 'https://github.com/muzalri', icon: 'fab fa-github' },
            { platform: 'Instagram', link: 'https://instagram.com/muzal_ri', icon: 'fab fa-instagram' },
          ],
        },
        {
          name: 'Anwar',
          position: 'Bendahara',
          image: require('@/assets/images/anwar.png'),
          socials: [
            { platform: 'GitHub', link: 'https://github.com/anwar-afk', icon: 'fab fa-github' },
            { platform: 'Instagram', link: 'https://instagram.com/anwarrff', icon: 'fab fa-instagram' },
          ],
        },
        // Tambahkan anggota tim lainnya sesuai kebutuhan
      ],
    };
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;600;800&display=swap');

html {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.body {
  background-image: url('~/assets/images/pattern.png'); /* Ganti dengan path pattern Anda */
  background-size: 1000px 1000px; /* Mengatur ukuran pattern menjadi kecil */
  background-repeat: repeat; /* Mengulang pattern */
  background-position: center; /* Pusatkan pattern */
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.text-teal-600 {
  color: #319795;
}

.hover\:text-teal-600:hover {
  color: #319795;
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

/* Add responsive utilities */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Add smooth transitions */
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Improve card animations */
.transform {
  transition: transform 0.3s ease;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>

