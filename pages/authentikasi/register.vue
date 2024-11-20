<template>
    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- Left Section -->
      <div class="w-full lg:w-5/12 flex items-center justify-center p-4 lg:p-0 bg-sky-100">
        <div class="w-full max-w-md px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-lg py-8">
          <div class="mb-6 lg:mb-8 text-center">
            <nuxt-link to="/">
              <img src="~/assets/images/logo.png" alt="Logo" class="h-10 lg:h-12 mx-auto">
            </nuxt-link>
          </div>
          
          <h1 class="text-2xl lg:text-3xl font-bold mb-2 text-center">Sign Up</h1>
          <p class="text-sm lg:text-base text-gray-600 mb-6 lg:mb-8 text-center">
            Input your data to register to our website.
          </p>
  
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {{ error }}
          </div>
  
          <form @submit.prevent="handleRegister" class="space-y-4">
            <div class="relative">
              <input 
                v-model="form.name"
                type="text"
                class="w-full px-5 py-3 lg:py-4 pl-14 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm lg:text-base bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm"
                placeholder="Full Name"
                required
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="bi bi-person text-sky-500 text-lg lg:text-xl"></i>
              </div>
            </div>
  
            <!-- Email Input -->
            <div class="relative">
              <input 
                v-model="form.email"
                type="email"
                class="w-full px-5 py-3 lg:py-4 pl-14 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm lg:text-base bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm"
                placeholder="Email Address"
                required
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="bi bi-envelope text-sky-500 text-lg lg:text-xl"></i>
              </div>
            </div>
  
            <!-- Password Input -->
            <div class="relative">
              <input 
                v-model="form.password"
                type="password"
                class="w-full px-5 py-3 lg:py-4 pl-14 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm lg:text-base bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm"
                placeholder="Password"
                required
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="bi bi-shield-lock text-sky-500 text-lg lg:text-xl"></i>
              </div>
            </div>
  
            <!-- Password Confirmation -->
            <div class="relative">
              <input 
                v-model="form.password_confirmation"
                type="password"
                class="w-full px-5 py-3 lg:py-4 pl-14 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm lg:text-base bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm"
                placeholder="Confirm Password"
                required
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="bi bi-shield-lock text-sky-500 text-lg lg:text-xl"></i>
              </div>
            </div>
  
            <!-- Phone Number -->
            <div class="relative">
              <input 
                v-model="form.no_hp"
                type="text"
                class="w-full px-5 py-3 lg:py-4 pl-14 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm lg:text-base bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm"
                placeholder="Phone Number"
                required
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="bi bi-phone text-sky-500 text-lg lg:text-xl"></i>
              </div>
            </div>
  
            <!-- Address -->
            <div class="relative">
              <input 
                v-model="form.alamat"
                type="text"
                class="w-full px-5 py-3 lg:py-4 pl-14 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm lg:text-base bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm"
                placeholder="Address"
                required
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="bi bi-geo-alt text-sky-500 text-lg lg:text-xl"></i>
              </div>
            </div>
  
            <button 
              type="submit"
              class="w-full py-3 lg:py-4 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 active:bg-teal-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm lg:text-base mt-8 lg:mt-10"
              :disabled="loading"
            >
              {{ loading ? 'Loading...' : 'Sign Up' }}
            </button>
          </form>
  
          <div class="text-center mt-6 lg:mt-8">
            <p class="text-gray-600 text-sm lg:text-base">
              Already have an account? 
              <nuxt-link to="/authentikasi/login" class="font-medium text-teal-600 hover:text-teal-800 transition-colors">
                Log in
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
  
      <!-- Right Section -->
      <div class="hidden lg:block lg:w-7/12 bg-teal-600"></div>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'auth',
    middleware: 'guest',
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          no_hp: '',
          alamat: ''
        },
        error: null,
        loading: false
      }
    },
    methods: {
      async handleRegister() {
        try {
          this.loading = true
          this.error = null
          
          // Validasi password confirmation di frontend
          if (this.form.password !== this.form.password_confirmation) {
            this.error = 'Password confirmation does not match'
            return
          }
          
          // Kirim request ke endpoint register Laravel
          const response = await this.$axios.post('/register', {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation,
            no_hp: this.form.no_hp,
            alamat: this.form.alamat
          })

          // Cek response success
          if (response.data.success) {
            try {
              // Login setelah registrasi berhasil
              await this.$auth.loginWith('local', {
                data: {
                  email: this.form.email,
                  password: this.form.password
                }
              })
              
              // Redirect ke dashboard setelah login berhasil
              this.$router.push('/dashboard')
            } catch (loginError) {
              console.error('Gagal login setelah registrasi:', loginError)
              this.error = 'Registrasi berhasil tapi gagal login otomatis. Silakan login manual.'
              this.$router.push('/authentikasi/login')
            }
          }
        } catch (err) {
          if (err.response?.data?.errors) {
            const errors = err.response.data.errors
            this.error = Object.values(errors)[0][0]
          } else {
            this.error = err.response?.data?.message || 'Terjadi kesalahan saat registrasi'
          }
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>