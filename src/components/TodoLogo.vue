<template>
  <div class="logo-container">
    <img alt="Vue logo" src="../assets/logo.png" class="logo" />
    <h2>VUE TODO APP</h2>
  </div>
</template>

<script>
export default {
  name: 'TodoLogo',
}
</script>

<style>
.logo-container {
    display: flex;
    justify-content: center;

}
.logo {
  display: block;
  margin: 20px 20px 20px 0;
  height: 75px;
}
</style>