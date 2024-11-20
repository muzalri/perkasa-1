<template>
  <div class="body">
    <div class="min-h-screen container mx-auto px-4 py-8 mt-16 w-8/12">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <!-- Header Profil -->
          <div class="flex items-center space-x-6 mb-8">
            <div class="relative">
              <img 
                :src="getUserImage(user.profile_photo)"
                class="w-24 h-24 rounded-full object-cover"
                alt="Profile Photo"
              />
              <label class="absolute bottom-0 right-0 bg-teal-800 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700">
                <input 
                  type="file" 
                  class="hidden" 
                  accept="image/*"
                  @change="handlePhotoUpload"
                />
                <i class="fas fa-camera"></i>
              </label>
            </div>
            <div class="flex justify-between items-start w-full">
              <div>
                <h1 class="text-2xl font-bold text-teal-800">{{ user.name }}</h1>
                <p class="text-gray-600">{{ user.email }}</p>
                <p class="text-sm text-teal-600 capitalize">{{ user.role }}</p>
              </div>
              <button
                v-if="user.role === 'user'"
                @click="requestRoleChange"
                class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200"
              >
                <i class="fas fa-user-edit mr-2"></i> Ajukan sebagai Pakar
              </button>
            </div>
          </div>

          <!-- Form Edit Profil -->
          <form @submit.prevent="updateProfile" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                v-model="form.name"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                v-model="form.email"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Password Baru (Opsional)</label>
              <input
                type="password"
                v-model="form.password"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
              <input
                type="password"
                v-model="form.password_confirmation"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
              />
            </div>

            <div class="flex justify-between">
              <button
                type="submit"
                class="bg-gradient-to-t from-[#064e50] to-[#0A585B] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
              >
                Simpan Perubahan
              </button>

              <button
                type="button"
                @click="logout"
                class="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      imagePort: 8000
    }
  },
  computed: {
    user() {
      return this.$auth.user || {}
    }
  },
  created() {
    this.form.name = this.user.name
    this.form.email = this.user.email
  },
  methods: {
    getUserImage(profilePath) {
      return profilePath
        ? `https://perkasa.miauwlan.com/imagedb/profile_photo/${profilePath}`
        : require('~/assets/images/anwar.png')
    },
    async handlePhotoUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const formData = new FormData()
      formData.append('profile_photo', file)

      try {
        await this.$axios.post('/api/profile/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        await this.$auth.fetchUser()
      } catch (error) {
        console.error('Gagal mengupload foto:', error)
        alert('Gagal mengupload foto profil')
      }
    },
    async updateProfile() {
      try {
        const formData = {
          name: this.form.name,
          email: this.form.email
        }

        if (this.form.password) {
          formData.password = this.form.password
          formData.password_confirmation = this.form.password_confirmation
        }

        await this.$axios.put('/profile', formData)
        await this.$auth.fetchUser()
        alert('Profil berhasil diperbarui')
      } catch (error) {
        console.error('Gagal memperbarui profil:', error)
        alert('Gagal memperbarui profil')
      }
    },
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push('/authentikasi/login')
      } catch (error) {
        console.error('Gagal logout:', error)
      }
    },
    async requestRoleChange() {
      try {
        const response = await this.$axios.post('/request-role-change')
        if (response.data.success) {
          alert('Permohonan perubahan role telah diajukan dan sedang ditinjau oleh admin.')
        }
      } catch (error) {
        console.error('Gagal mengajukan permohonan:', error)
        alert('Gagal mengajukan permohonan. Silakan coba lagi.')
      }
    }
  }
}
</script>

<style scoped>
.body {
  background-image: url('~/assets/images/pattern.png');
  background-size: 1000px 1000px;
  background-repeat: repeat;
  background-position: center;
}
</style>
