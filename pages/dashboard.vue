<template>
  <div class="body">
    <section class="min-h-screen flex items-center relative">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <!-- Text Content -->
        <div class="text-center md:text-left md:ml-40">
          <h2 class="text-4xl font-bold text-teal-800 mb-4 leading-tight">
            Belajar Berternak Ikan <br />
            <span class="text-teal-600">Mulai dari Sekarang!</span>
          </h2>
          <p class="text-gray-700 text-lg mb-6">
            Belajar beternak ikan secara mudah, efektif, dan aman. Diawasi pakar mulai dari
            <strong>Rp. 49.999</strong>.
          </p>
          <button class="mt-4 bg-teal-600 text-white px-8 py-3 rounded hover:bg-teal-700">
            Harga
          </button>
        </div>
        <!-- Image -->
        <div class="mt-8 md:mt-0 md:mr-40">
          <img src="~/assets/images/peternak.png" alt="Peternak Ikan" class="w-48 md:w-64 mx-auto mt-20" />
        </div>
      </div>
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <img src="~/assets/images/pattern.png" alt="Background Pattern" class="w-full h-full object-cover" />
      </div>
    </section>


    <!-- Features Section -->
    <section class="py-12 min-h-svh">
      <div class="container mx-auto text-center">
        <h3 class="text-3xl font-bold mb-8">Fitur Perkasa</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mr-20 ml-20">
          <div class="bg-white p-6 shadow rounded">
            <img src="~/assets/images/komunitas.png" alt="Komunitas" class="w-16 h-16 mx-auto mb-4" />
            <h4 class="font-bold text-lg">Komunitas</h4>
            <p>Berbagi dengan pengguna lain di komunitas</p>
          </div>
          <div class="bg-white p-6 shadow rounded">
            <img src="~/assets/images/konsultasi.png" alt="Konsultasi" class="w-16 h-16 mx-auto mb-4" />
            <h4 class="font-bold text-lg">Konsultasi</h4>
            <p>Bertanya kepada pakar secara langsung</p>
          </div>
          <div class="bg-white p-6 shadow rounded">
            <img src="~/assets/images/panduan.png" alt="Panduan" class="w-16 h-16 mx-auto mb-4" />
            <h4 class="font-bold text-lg">Panduan</h4>
            <p>Dapatkan informasi tentang cara berternak ikan</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile Section -->
    <section class="py-12 flex items-center bg-pattern bg-cover bg-center">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Gambar Ponsel -->
        <div class="flex justify-center">
          <img src="~/assets/images/mobile.png" alt="Mobile App" class="w-64 md:w-80" />
        </div>

        <!-- Teks dan Tombol -->
        <div>
          <h3 class="text-3xl font-bold text-teal-800 mb-4">Hadir di Aplikasi Mobile!</h3>
          <p class="text-gray-600 mb-6">
            Dapatkan aplikasi kami di Google Play Store. Konsultasi dengan pakar, 
            berjelajah di Komunitas, dan belajar cara beternak ikan di Guidebook. Sekarang hadir juga di Aplikasi Mobile!
          </p>
          <a href="#" class="inline-block">
            <img src="~/assets/images/playstore.png" alt="Google Play" class="w-48" />
          </a>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-12 min-h-screen">
      <div class="container mx-auto text-center px-4 md:px-8 lg:px-16">
        <h3 class="text-3xl font-bold mb-8">Berkenalan dengan Kami!</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="member in teamMembers" :key="member.name" class="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img :src="member.image" :alt="member.name" class="w-full h-48 object-cover mb-4" />
            <div class="p-4">
              <h4 class="font-bold text-xl text-teal-700">{{ member.name }}</h4>
              <p class="text-gray-600 mb-4">{{ member.position }}</p>
              <div class="flex justify-center space-x-4">
                <a v-for="social in member.socials" :key="social.platform" :href="social.link" target="_blank" class="text-gray-500 hover:text-teal-600">
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
          name: 'Daffa Abiyya',
          position: 'UI Designer',
          image: require('@/assets/images/cibe.png'),
          socials: [
            { platform: 'GitHub', link: 'https://github.com/frizaski', icon: 'fab fa-github' },
            { platform: 'Instagram', link: 'https://instagram.com/frizaski', icon: 'fab fa-instagram' },
          ],
        },
        {
          name: 'Cahya',
          position: 'Project Manager & Mobile Developer',
          image: require('@/assets/images/anwar.png'),
          socials: [
            { platform: 'GitHub', link: 'https://github.com/bilal', icon: 'fab fa-github' },
            { platform: 'Instagram', link: 'https://instagram.com/bilal', icon: 'fab fa-instagram' },
          ],
        },
        {
          name: 'Algip',
          position: 'bos',
          image: require('@/assets/images/algip.png'),
          socials: [
            { platform: 'GitHub', link: 'https://github.com/bilal', icon: 'fab fa-github' },
            { platform: 'Instagram', link: 'https://instagram.com/bilal', icon: 'fab fa-instagram' },
          ],
        },
        {
          name: 'Anwar',
          position: 'bendahara',
          image: require('@/assets/images/anwar.png'),
          socials: [
            { platform: 'GitHub', link: 'https://github.com/bilal', icon: 'fab fa-github' },
            { platform: 'Instagram', link: 'https://instagram.com/bilal', icon: 'fab fa-instagram' },
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
</style>

