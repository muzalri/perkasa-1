<template>
    <div class="mt-15 p-5 pt-20 px-20">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Panduan</h1>
        <NuxtLink 
          to="/konsultasi/create" 
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Konsultasi Baru
        </NuxtLink>
      </div>
  
      <!-- Consultation List -->
      <div class="space-y-4">
        <div 
          v-for="chat in consultations" 
          :key="chat.id" 
          class="bg-white rounded-lg shadow p-4 flex items-center justify-between hover:bg-gray-50"
        >
          <NuxtLink :to="`/konsultasi/${chat.id}`" class="flex-1">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                {{ chat.initial }}
              </div>
              <div>
                <h3 class="font-medium">{{ chat.title }}</h3>
                <p class="text-sm text-gray-500">{{ chat.description }}</p>
              </div>
            </div>
          </NuxtLink>
          <button 
            @click="deleteConsultation(chat.id)" 
            class="text-red-500 hover:text-red-700"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        consultations: [
          {
            id: 1,
            initial: 'P',
            title: 'pakar_cahya',
            description: 'ilham konsul skena'
          },
          {
            id: 2, 
            initial: 'R',
            title: 'raffa',
            description: 'ngetes ui'
          }
        ]
      }
    },
    methods: {
      deleteConsultation(id) {
        // Implement delete logic
      },
      goToShow(id) {
        this.$router.push({ name: 'show', params: { id } });
      }
    }
  }
  </script>
  