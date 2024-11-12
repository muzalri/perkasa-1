<template>
    <div class="flex h-screen bg-gray-100">
      <!-- Bagian kiri - Gambar dan Pesan Selamat Datang -->
      <div class="hidden lg:flex lg:w-1/2 bg-teal-600">
        <div class="w-full flex flex-col justify-center items-center text-center">
          <div class="text-white text-6xl font-bold">
            Selamat<br>Datang<br>Kembali!
          </div>
        </div>
      </div>
      
      <!-- Bagian kanan - Form Login -->
      <div class="w-full lg:w-1/2 flex items-center justify-center">
        <div class="max-w-md w-full space-y-8 p-10 bg-sky-50 rounded-xl shadow-lg">
          <div class="text-center">
            <h2 class="mt-6 text-3xl font-bold text-gray-900">
              Login
            </h2>
            <p class="mt-2 text-sm text-gray-600">
              Masukkan detail Anda untuk masuk ke akun Anda
            </p>
          </div>
  
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {{ error }}
          </div>
  
          <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email" class="sr-only">Email</label>
                <input 
                  id="email" 
                  v-model="form.email"
                  type="email" 
                  required 
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" 
                  placeholder="Email"
                >
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input 
                  id="password" 
                  v-model="form.password"
                  type="password" 
                  required 
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" 
                  placeholder="Password"
                >
              </div>
            </div>
  
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input 
                  id="remember_me" 
                  v-model="form.remember"
                  type="checkbox" 
                  class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                >
                <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                  Ingat saya
                </label>
              </div>
  
              <div class="text-sm">
                <nuxt-link to="/forgot-password" class="font-medium text-teal-600 hover:text-teal-500">
                  Lupa password?
                </nuxt-link>
              </div>
            </div>
  
            <div>
              <button 
                type="submit" 
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                :disabled="loading"
              >
                {{ loading ? 'Loading...' : 'Login' }}
              </button>
            </div>
          </form>
  
          <div class="text-center">
            <p class="mt-2 text-sm text-gray-600">
              Belum punya akun?
              <NuxtLink to="/authentikasi/register" class="font-medium text-teal-600 hover:text-teal-500">
                Daftar
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'auth',
    middleware: 'guest',
    data() {
      return {
        form: {
          email: '',
          password: '',
          remember: false
        },
        error: null,
        loading: false
      }
    },
    methods: {
      async handleLogin() {
        try {
          this.loading = true
          this.error = null
          
          const response = await this.$auth.loginWith('local', {
            data: {
              email: this.form.email,
              password: this.form.password,
              remember: this.form.remember
            }
          });
              if (response?.data?.success) {
            const token = response.data.token; // Pastikan token ada di respons
            localStorage.setItem('token', token); // Simpan token
            this.$router.push('/dashboard');
          }

          if (response?.data?.success) {
            this.$router.push('/dashboard')
          }

        } catch (err) {
          console.error('Error login:', err)
          this.error = err?.response?.data?.message || 'Email atau password salah'
        } finally {
          this.loading = false
        }
      }
    },
    watch:{
      'form.email': function(newVal){
        console.log(newVal)
      },
      'form.password': function(newVal){
        console.log(newVal)
      }
    }
  }
  </script>