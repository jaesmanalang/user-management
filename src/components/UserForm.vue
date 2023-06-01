<template>
  <form
    @submit.prevent="handleSubmit"
    novalidate
    :class="{ 'was-validated': isSubmitted }"
  >
    <div class="p-3 border mb-4">
      <h4 class="text-uppercase">Basic Information</h4>
      <MDBRow class="g-3">
        <MDBCol sm="4">
          <MDBInput
            label="Last Name"
            v-model="basicForm.lastName"
            required
            invalidFeedback="Please provide your last name"
            :disabled="!props.editMode"
          />
        </MDBCol>
        <MDBCol sm="4">
          <MDBInput
            label="First Name"
            v-model="basicForm.firstName"
            required
            invalidFeedback="Please provide your last name"
            :disabled="!props.editMode"
          />
        </MDBCol>
        <MDBCol sm="4">
          <MDBInput
            label="Middle Name"
            v-model="basicForm.middleName"
            :disabled="!props.editMode"
          />
        </MDBCol>

        <MDBCol sm="4">
          <div class="py-1">
            <span>Gender: </span>
            <MDBRadio
              label="Male"
              value="Male"
              name="gender"
              inline
              v-model="basicForm.gender"
              required
              :disabled="!props.editMode"
            />
            <MDBRadio
              label="Female"
              value="Female"
              name="gender"
              inline
              v-model="basicForm.gender"
              required
              :disabled="!props.editMode"
            />
          </div>
        </MDBCol>

        <MDBCol sm="4">
          <MDBInput
            label="Birthday"
            placeholder=" "
            type="date"
            v-model="basicForm.birthday"
            required
            invalidFeedback="Please provide your birthday"
            :disabled="!props.editMode"
          />
        </MDBCol>

        <MDBCol sm="4">
          <div class="position-relative">
            <select
              class="form-control"
              v-model="basicForm.maritalStatus"
              required
              :disabled="!props.editMode"
            >
              <option value="" selected disabled hidden>
                -- Marital Status --
              </option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
            <MDBIcon class="select-icon" icon="angle-down" />
          </div>
        </MDBCol>

        <MDBCol sm="4">
          <MDBInput
            label="Contact Number"
            v-model="basicForm.contactNumber"
            required
            invalidFeedback="Please provide a contact number"
            :disabled="!props.editMode"
          />
        </MDBCol>

        <MDBCol sm="4">
          <MDBInput
            label="Citizenship"
            v-model="basicForm.citizenship"
            required
            invalidFeedback="Please provide citizenship"
            :disabled="!props.editMode"
          />
        </MDBCol>

        <MDBCol sm="4">
          <MDBInput
            label="Email"
            type="email"
            v-model="basicForm.email"
            required
            invalidFeedback="Please provide an email"
            :disabled="!props.editMode"
          />
        </MDBCol>

        <MDBCol md="9">
          <MDBInput
            label="Address"
            v-model="basicForm.address"
            required
            invalidFeedback="Please provide your address"
            :disabled="!props.editMode"
          />
        </MDBCol>

        <MDBCol md="3">
          <div class="position-relative">
            <select
              class="form-control"
              v-model="basicForm.country"
              required
              :disabled="!props.editMode"
            >
              <option value="" selected hidden disabled>-- Country --</option>
              <option value="PH">Philippines</option>
              <option value="KR">Korea</option>
              <option value="JP">Japan</option>
              <option value="US">United States</option>
            </select>
            <MDBIcon class="select-icon" icon="angle-down" />
          </div>
        </MDBCol>

        <MDBCol>
          <MDBInput
            label="Father's Name (Optional)"
            v-model="basicForm.fatherName"
            :disabled="!props.editMode"
          />
        </MDBCol>

        <MDBCol>
          <MDBInput
            label="Mother's Name (Optional)"
            v-model="basicForm.motherName"
            :disabled="!props.editMode"
          />
        </MDBCol>
      </MDBRow>
    </div>

    <div class="p-3 border mb-4">
      <h4 class="text-uppercase">Work Information</h4>
      <MDBRow class="g-3">
        <MDBCol sm="9">
          <MDBInput
            label="Company Name"
            v-model="workForm.companyName"
            required
            invalidFeedback="Please provide company name"
            :disabled="!props.editMode"
          />
        </MDBCol>
        <MDBCol sm="3">
          <MDBInput
            label="Position"
            v-model="workForm.position"
            required
            invalidFeedback="Please provide your position"
            :disabled="!props.editMode"
          />
        </MDBCol>
        <MDBCol col="12">
          <MDBInput
            label="Address (Optional)"
            v-model="workForm.companyAddress"
            :disabled="!props.editMode"
          />
        </MDBCol>
        <MDBCol sm="9">
          <MDBInput
            label="Company Contact Number"
            v-model="workForm.companyContactNumber"
            required
            invalidFeedback="Please provide company contact number"
            :disabled="!props.editMode"
          />
        </MDBCol>
        <MDBCol sm="4">
          <MDBInput
            label="TIN (Optional)"
            v-model="workForm.tin"
            :disabled="!props.editMode"
          />
        </MDBCol>
        <MDBCol sm="4">
          <MDBInput
            label="SSS (Optional) "
            v-model="workForm.sss"
            :disabled="!props.editMode"
        /></MDBCol>
        <MDBCol sm="4">
          <MDBInput
            label="PAGIBIG (Optional)"
            v-model="workForm.pagibig"
            :disabled="!props.editMode"
        /></MDBCol>
      </MDBRow>
    </div>

    <div>
      <MDBCheckbox
        label="I Agree to Terms and Conditions"
        invalidFeedback="You must agree before submitting"
        :isValid="isAgree"
        required
        v-model="isAgree"
        v-if="props.editMode"
      />
    </div>
  </form>
</template>

<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBRadio,
  MDBIcon,
  MDBCheckbox,
} from 'mdb-vue-ui-kit';
import { useRouter } from 'vue-router';
import { useUsersStore } from '../stores/usersStore';

export default defineComponent({
  components: {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBRadio,
    MDBIcon,
    MDBCheckbox,
  },

  props: {
    editMode: {
      type: Boolean,
      default: true,
    },
    actionText: {
      type: String,
    },
    userData: {
      type: Object,
    },
  },

  setup(props, context) {
    const router = useRouter();
    const usersStore = useUsersStore();
    const basicForm = reactive({
      lastName: '',
      firstName: '',
      middleName: '',
      gender: 'Male',
      birthday: '',
      maritalStatus: '',
      contactNumber: '',
      citizenship: '',
      email: '',
      address: '',
      country: '',
      fatherName: '',
      motherName: '',
    });

    const workForm = reactive({
      companyName: 'Sprout Solution',
      position: 'FE',
      companyAddress: '',
      companyContactNumber: '',
      tin: '',
      sss: '',
      pagibig: '',
    });

    const isAgree = ref(false);

    const isSubmitted = ref(false);

    const handleApproveAndReject = () => {
      if (props.actionText === 'Approve') {
        usersStore.updateStatus(props.userData.id, 'Approved');
      } else if (props.actionText === 'Reject') {
        usersStore.updateStatus(props.userData.id, 'Rejected');
      }

      router.push('/users');
    };

    const handleSubmit = () => {
      isSubmitted.value = true;

      if (props.actionText === 'Approve' || props.actionText === 'Reject') {
        handleApproveAndReject();
      }

      if (
        !isAgree.value ||
        basicForm.lastName === '' ||
        basicForm.firstName === '' ||
        workForm.position === ''
      ) {
        return;
      }

      if (props.editMode && props.userData) {
        // Update User
        usersStore.editUser(props.userData.id, {
          ...basicForm,
          ...workForm,
        });
      } else {
        console.log('add run');
        // Add User
        const newUser = {
          id: usersStore.nextId++,
          ...basicForm,
          ...workForm,
          status: 'Pending',
        };
        usersStore.users.push(newUser);
      }

      router.push('/users');
    };

    context.expose({ handleSubmit });

    if (props.userData) {
      basicForm.lastName = props.userData.lastName;
      basicForm.firstName = props.userData.firstName;
      basicForm.middleName = props.userData.middleName;
      basicForm.gender = props.userData.gender;
      basicForm.birthday = props.userData.birthday;
      basicForm.maritalStatus = props.userData.maritalStatus;
      basicForm.contactNumber = props.userData.contactNumber;
      basicForm.citizenship = props.userData.citizenship;
      basicForm.email = props.userData.email;
      basicForm.country = props.userData.country;
      basicForm.address = props.userData.address;
      basicForm.fatherName = props.userData.fatherName;
      basicForm.motherName = props.userData.motherName;

      workForm.companyName = props.userData.companyName;
      workForm.position = props.userData.position;
      workForm.companyAddress = props.userData.companyAddress;
      workForm.companyContactNumber = props.userData.companyContactNumber;
      workForm.tin = props.userData.tin;
      workForm.sss = props.userData.sss;
      workForm.pagibig = props.userData.pagibig;
    }

    return {
      props,
      basicForm,
      workForm,
      handleSubmit,
      usersStore,
      isAgree,
      isSubmitted,
    };
  },
});
</script>

<style scoped>
.select-icon {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  z-index: 0;
}

.was-validated select.form-control:invalid {
  color: #dc4c64;
}
</style>
