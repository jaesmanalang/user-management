<template>
  <!-- Button trigger modal -->

  <MDBModal
    id="exampleModal"
    tabindex="-1"
    labelledby="exampleModalLabel"
    v-model="showModal"
    centered
    @hide="closeModal"
  >
    <MDBModalBody class="py-5 text-center text-xl">
      {{ props.message }}
    </MDBModalBody>
    <MDBModalFooter class="justify-content-between">
      <MDBBtn color="secondary" @click="closeModal">Cancel</MDBBtn>
      <MDBBtn :color="props.actionBtnColor" @click="handleAction">
        {{ props.actionText }}</MDBBtn
      >
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import {
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from 'mdb-vue-ui-kit';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ConfirmationModal',
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: 'Do you wish to proceed?',
    },
    actionText: {
      type: String,
      default: 'Proceed',
    },
    actionBtnColor: {
      type: String,
      default: 'primary',
    },
  },
  components: {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
  },

  emits: ['closeModal', 'handleAction'],

  setup(props, context) {
    const showModal = ref(props.showModal);

    const closeModal = () => {
      context.emit('closeModal');
    };

    const handleAction = () => {
      context.emit('handleAction');
      closeModal();
    };

    watch(
      () => props.showModal,
      (status) => {
        showModal.value = status;
      }
    );

    return {
      props,
      showModal,
      closeModal,
      handleAction,
    };
  },
});
</script>
