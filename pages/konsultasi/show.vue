<template>
  <div class="h-screen flex flex-col">
    <!-- Chat Header -->
    <div class="bg-white border-b p-4 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <NuxtLink to="/konsultasi" class="text-gray-600 hover:text-gray-800">
          <i class="fas fa-arrow-left"></i>
        </NuxtLink>
        <h2 class="font-semibold">{{ consultation.title }}</h2>
      </div>
      <div class="text-sm text-gray-500">
        Status: {{ consultation.status }}
      </div>
    </div>

    <!-- Chat Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div v-for="message in messages" :key="message.id" class="flex flex-col">
        <div :class="[
          'max-w-[70%] rounded-lg p-3',
          message.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100'
        ]">
          {{ message.content }}
        </div>
        <span class="text-xs text-gray-500 mt-1">
          {{ message.timestamp }}
        </span>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="border-t p-4 bg-white">
      <form @submit.prevent="sendMessage" class="flex space-x-4">
        <input 
          type="file" 
          ref="fileInput" 
          class="hidden" 
          @change="handleFileChange"
        >
        <button 
          type="button" 
          @click="$refs.fileInput.click()"
          class="text-gray-500 hover:text-gray-700"
        >
          <i class="fas fa-paperclip"></i>
        </button>
        <input 
          v-model="newMessage" 
          type="text" 
          class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ketik pesan..."
        >
        <button 
          type="submit" 
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Kirim
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const consultation = ref({
  title: '',
  status: ''
})
</script>
