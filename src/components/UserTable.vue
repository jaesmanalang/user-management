<template>
  <MDBTable border class="text-center">
    <thead>
      <tr>
        <th>#</th>
        <th>NAME</th>
        <th>COMPANY</th>
        <th>POSITION</th>
        <th>STATUS</th>
        <th>ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in props.users" :key="user.id">
        <td>{{ index + 1 }}</td>
        <td>{{ user.firstName }} {{ user.lastName }}</td>
        <td>{{ user.companyName }}</td>
        <td>{{ user.position }}</td>
        <td>
          <MDBBadge :color="getBadgeColor(user.status)">{{
            user.status
          }}</MDBBadge>
        </td>
        <td>
          <MDBBtn color="info" @click="editUser(user.id)">
            <MDBIcon icon="pencil" />
          </MDBBtn>
          <MDBBtn color="danger" @click="openModal(user.id)">
            <MDBIcon icon="trash" />
          </MDBBtn>
        </td>
      </tr>
    </tbody>
  </MDBTable>

  <ConfirmationModal
    :showModal="showModal"
    @closeModal="closeModal"
    @handleAction="handleAction"
    message="Are you sure you want to delete this user?"
    actionText="Delete"
    actionBtnColor="danger"
  />
</template>

<script>
import { defineComponent, ref } from 'vue';
import { MDBTable, MDBBtn, MDBIcon, MDBBadge } from 'mdb-vue-ui-kit';
import { useUsersStore } from '../stores/usersStore';
import { useRouter } from 'vue-router';
import ConfirmationModal from './ConfirmationModal.vue';

export default defineComponent({
  components: {
    MDBTable,
    MDBBtn,
    MDBIcon,
    MDBBadge,
    ConfirmationModal,
  },
  props: {
    users: Array,
    required: true,
  },
  setup(props) {
    const router = useRouter();
    const usersStore = useUsersStore();
    const showModal = ref(false);
    const selectedId = ref(null);

    const getBadgeColor = (status) => {
      if (status === 'Approved') {
        return 'success';
      } else if (status === 'Rejected') {
        return 'danger';
      } else {
        return 'warning';
      }
    };

    const openModal = (id) => {
      showModal.value = true;
      selectedId.value = id;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const handleAction = () => {
      if (selectedId) {
        usersStore.deleteUser(selectedId.value);
      }
    };

    const editUser = (id) => {
      router.push({ name: 'EditUser', params: { id } });
    };

    return {
      usersStore,
      props,
      editUser,
      showModal,
      handleAction,
      openModal,
      closeModal,
      getBadgeColor,
    };
  },
});
</script>
