<template>
  <div class="d-flex align-items-center justify-content-between mb-3">
    <MDBBtn color="secondary" @click="goBack">Back</MDBBtn>
    <div>
      <MDBBtn
        color="danger"
        @click="openRejectModal"
        :disabled="currentUserData.status === 'Rejected'"
        >Reject</MDBBtn
      >
      <MDBBtn
        color="success"
        @click="openApproveModal"
        :disabled="currentUserData.status === 'Approved'"
        >Approve</MDBBtn
      >
      <MDBBtn color="primary" @click="editMode = true" v-if="!editMode"
        >Edit</MDBBtn
      >
      <MDBBtn color="primary" @click="openEditModal" v-if="editMode"
        >Save</MDBBtn
      >
    </div>
  </div>
  <UserForm
    ref="userFormRef"
    :editMode="editMode"
    :userData="currentUserData"
    :actionText="actionText"
  />
  <ConfirmationModal
    :showModal="showModal"
    @closeModal="closeModal"
    @handleAction="handleAction"
    :message="message"
    :actionText="actionText"
    :actionBtnColor="actionBtnColor"
  />
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { MDBBtn } from 'mdb-vue-ui-kit';
import { useUsersStore } from '../../stores/usersStore';
import UserForm from '../../components/UserForm.vue';
import ConfirmationModal from '../../components/ConfirmationModal.vue';

export default defineComponent({
  name: 'EditUser',
  components: {
    MDBBtn,
    UserForm,
    ConfirmationModal,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const showModal = ref(false);
    const userFormRef = ref(null);
    const usersStore = useUsersStore();
    const editMode = ref(false);

    const message = ref('Are you sure you want to edit this user?');
    const actionText = ref('Update');
    const actionBtnColor = ref('primary');

    const currentUserData = usersStore.getUserById(
      Number.parseInt(route.params.id)
    );

    onMounted(() => {
      if (!currentUserData) {
        router.push('/users');
      }
    });

    const goBack = () => {
      if (editMode.value) {
        editMode.value = false;
      } else {
        router.go(-1);
      }
    };

    const openEditModal = () => {
      showModal.value = true;
      message.value = 'Are you sure you want to update this user?';
      actionText.value = 'Update';
    };

    const openRejectModal = () => {
      showModal.value = true;
      message.value = 'Are you sure you want to reject this user?';
      actionText.value = 'Reject';
      actionBtnColor.value = 'danger';
    };

    const openApproveModal = () => {
      showModal.value = true;
      message.value = 'Are you sure you want to approve this user?';
      actionText.value = 'Approve';
      actionBtnColor.value = 'success';
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const handleAction = () => {
      if (userFormRef.value) {
        userFormRef.value.handleSubmit();
      }
    };

    return {
      goBack,
      closeModal,
      handleAction,
      currentUserData,
      editMode,
      userFormRef,
      message,
      actionText,
      showModal,
      openEditModal,
      openApproveModal,
      openRejectModal,
      actionBtnColor,
    };
  },
});
</script>
