<template>
  <MDBRow class="justify-content-between">
    <MDBCol col="6" lg="4">
      <FilterInput />
    </MDBCol>
    <MDBCol col="6" lg="4" class="d-flex justify-content-end align-items-start">
      <RouterLink class="btn btn-primary" :to="{ name: 'AddUser' }">
        Add
      </RouterLink>
    </MDBCol>
  </MDBRow>

  <div>query: {{ searchQuery }}</div>
  <UserTable :users="usersStore.filteredUsers" />
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { MDBRow, MDBCol, MDBBtn } from 'mdb-vue-ui-kit';
import { useUsersStore } from '../../stores/usersStore';
import UserTable from '../../components/UserTable.vue';
import FilterInput from '../../components/FilterInput.vue';

export default defineComponent({
  components: {
    UserTable,
    FilterInput,
    MDBBtn,
    MDBRow,
    MDBCol,
    RouterLink,
  },

  setup() {
    const usersStore = useUsersStore();

    const searchQuery = computed(() => usersStore.searchQuery);

    return {
      usersStore,
      searchQuery,
    };
  },
});
</script>
