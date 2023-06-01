<template>
  <MDBInput
    inputGroup
    :formOutline="false"
    wrapperClass="mb-3"
    v-model="searchQuery"
    aria-label="User filter"
    placeholder="Search"
    @input="handleInputChange"
  >
    <MDBDropdown btnGroup v-model="dropdownOpen" align="end">
      <MDBBtn outline="primary">{{ usersStore.selectedStatus }}</MDBBtn>
      <MDBDropdownToggle
        outline="primary"
        split
        @click="dropdownOpen = !dropdownOpen"
      />
      <MDBDropdownMenu>
        <MDBDropdownItem tag="button" @click="handleStatusChange('All')"
          >All</MDBDropdownItem
        >
        <MDBDropdownItem tag="button" @click="handleStatusChange('Pending')"
          >Pending</MDBDropdownItem
        >
        <MDBDropdownItem tag="button" @click="handleStatusChange('Approved')"
          >Approved</MDBDropdownItem
        >
        <MDBDropdownItem tag="button" @click="handleStatusChange('Rejected')"
          >Rejected</MDBDropdownItem
        >
      </MDBDropdownMenu>
    </MDBDropdown>
  </MDBInput>
</template>

<script>
import { defineComponent, toRef, ref, watch } from 'vue';
import {
  MDBInput,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn,
} from 'mdb-vue-ui-kit';
import { useUsersStore } from '../stores/usersStore';

export default defineComponent({
  components: {
    MDBInput,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBBtn,
  },

  setup() {
    const usersStore = useUsersStore();
    const searchQuery = ref(usersStore.searchQuery);
    const dropdownOpen = ref(false);

    const handleInputChange = (e) => {
      usersStore.setSearchQuery(e.target.value);
    };

    const handleStatusChange = (value) => {
      usersStore.setSelectedStatus(value);
    };

    return {
      usersStore,
      dropdownOpen,
      searchQuery,
      handleInputChange,
      handleStatusChange,
    };
  },
});
</script>
