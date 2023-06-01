<template>
  <div class="d-flex align-items-center justify-content-between mb-3">
    <MDBBtn color="secondary" @click="goBack">Back</MDBBtn>
    <MDBBtn color="primary" @click="openModal">Save</MDBBtn>
  </div>
  <UserForm ref="userFormRef" />
  <ConfirmationModal
    :showModal="showModal"
    @closeModal="closeModal"
    @handleAction="handleAction"
    message="Are you sure you want to add this user?"
    actionText="Save"
  />
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { MDBBtn } from 'mdb-vue-ui-kit';
import UserForm from '../../components/UserForm.vue';
import ConfirmationModal from '../../components/ConfirmationModal.vue';

export default defineComponent({
  components: {
    UserForm,
    MDBBtn,
    ConfirmationModal,
  },
  setup() {
    const router = useRouter();
    const showModal = ref(false);
    const userFormRef = ref(null);

    const goBack = () => {
      router.go(-1);
    };

    const openModal = () => {
      showModal.value = true;
      console.log(showModal.value);
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
      showModal,
      openModal,
      closeModal,
      handleAction,
      userFormRef,
    };
  },
});
</script>
