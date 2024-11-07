<template>
  <div>
    <Navbar v-if="$auth.loggedIn" />
    <Nuxt />
  </div>
</template>
  
 