<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'guest',
  beforeCreate() {
    this.$router.push('/authentikasi/login')
  }
}
</script> 