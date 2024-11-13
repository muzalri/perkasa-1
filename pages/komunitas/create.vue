<template>
    <div class="body">
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-16">
        <h1 class="text-2xl font-bold mb-6 text-teal-800">Buat Artikel Baru</h1>
        <form @submit.prevent="submitForm">
        <!-- Judul -->
        <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
            <input
            type="text"
            id="title"
            v-model="form.title"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
            required
            />
        </div>

        <!-- Kategori -->
        <div class="mb-4">
            <label for="komunitas_category_id" class="block text-sm font-medium text-gray-700">Kategori</label>
            <select
            id="komunitas_category_id"
            v-model="form.komunitas_category_id"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
            required
            >
            <option value="" disabled>Pilih Kategori</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
            </option>
            </select>
        </div>

        <!-- Isi Artikel -->
        <div class="mb-4">
            <label for="body" class="block text-sm font-medium text-gray-700">Isi Artikel</label>
            <textarea
            id="body"
            v-model="form.body"
            rows="5"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
            required
            ></textarea>
        </div>

        <!-- Gambar -->
        <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Gambar</label>
            <input
            type="file"
            id="image"
            @change="handleImageUpload"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
            accept="image/*"
            />
        </div>

        <!-- Pratinjau Gambar -->
        <div v-if="imagePreview" class="mb-4">
            <p class="text-sm font-medium text-gray-700">Pratinjau Gambar:</p>
            <img :src="imagePreview" alt="Pratinjau Gambar" class="w-full h-auto rounded-md shadow-md mt-2" />
        </div>

        <!-- Tombol Submit -->
        <div class="flex justify-end">
            <button
            type="submit"
            class="bg-teal-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-teal-700 transition"
            >
            Publikasikan
            </button>
        </div>
        </form>
    </div>
    </div>
</template>
  
<script>
    export default {
    data() {
        return {
        form: {
            title: '',
            komunitas_category_id: '',
            body: '',
            image: null,
        },
        categories: [],
        imagePreview: null,
        };
    },
    async created() {
        await this.fetchCategories();
    },
    methods: {
        async fetchCategories() {
        try {
            const { data } = await this.$axios.get('/komunitas/categories');
            this.categories = data.data;
        } catch (error) {
            console.error('Gagal mengambil kategori:', error);
        }
        },
        async submitForm() {
        if (!this.form.title || !this.form.komunitas_category_id || !this.form.body) {
            alert('Harap isi semua bidang yang diperlukan.');
            return;
        }

        const formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('komunitas_category_id', this.form.komunitas_category_id);
        formData.append('body', this.form.body);
        if (this.form.image) {
            formData.append('image', this.form.image);
        }

        try {
            const { data } = await this.$axios.post('/komunitas', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            alert('Artikel berhasil dibuat!');
            this.$router.push(`/komunitas/${data.data.id}`);
        } catch (error) {
            console.error('Gagal membuat artikel:', error.response.data);
        }
        },
        handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.form.image = file;
            this.imagePreview = URL.createObjectURL(file);
        }
        },
    },
    };
</script>
 
<style scoped>
.body {
  background-image: url('~/assets/images/pattern.png'); /* Ganti dengan path pattern Anda */
  background-size: 1000px 1000px; /* Mengatur ukuran pattern menjadi kecil */
  background-repeat: repeat; /* Mengulang pattern */
  background-position: center; /* Pusatkan pattern */
  padding-top: 40px;
}
</style>