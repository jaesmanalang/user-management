<template>
  <MDBContainer class="py-4">
    <RouterView />
  </MDBContainer>
</template>

<script>
import { MDBContainer } from 'mdb-vue-ui-kit';
import { RouterView } from 'vue-router';
export default {
  components: {
    MDBContainer,
    RouterView,
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
