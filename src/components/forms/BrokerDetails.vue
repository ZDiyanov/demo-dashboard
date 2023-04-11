<script>
  import { isNum } from '@/utils';
  import {
    roles as userRolesList,
    statuses as accountStatusList,
    types as employeeTypesList,
  } from '@/configs/brokers';

  export default {
    name: 'BrokerDetailsForm',
    props: {
      value: {
        type: Object,
        required: true,
        // validate the model
      },
      v: {
        type: Object,
      },
    },
    data() {
      return {
        userRolesList,
        accountStatusList,
        employeeTypesList,
        canSeePassword: false,
      };
    },
    computed: {
      firstNameErrors() {
        const errors = [];
        if (!this.v.firstName.$dirty) {
          return errors;
        }
        if (!this.v.firstName.required) {
          errors.push('First name is required.');
        }
        return errors;
      },
      lastNameErrors() {
        const errors = [];
        if (!this.v.lastName.$dirty) {
          return errors;
        }
        if (!this.v.lastName.required) {
          errors.push('Last name is required.');
        }
        return errors;
      },
      emailErrors() {
        const errors = [];
        if (!this.v.email.$dirty) {
          return errors;
        }
        if (!this.v.email.required) {
          errors.push('Email is required.');
        }
        if (!this.v.email.email) {
          errors.push('Should be a valid email.');
        }
        return errors;
      },
      phonePrefixErrors() {
        const errors = [];
        if (!this.v.phonePrefix.$dirty) {
          return errors;
        }
        if (!this.v.phonePrefix.required) {
          errors.push('Phone prefix is required.');
        }
        if (!this.v.phonePrefix.minLength) {
          errors.push('Phone prefix must be atleast 2 numbers.');
        }
        return errors;
      },
      phoneNumberErrors() {
        const errors = [];
        if (!this.v.phoneNumber.$dirty) {
          return errors;
        }
        if (!this.v.phoneNumber.required) {
          errors.push('Phone number is required.');
        }
        if (!this.v.phoneNumber.minLength) {
          errors.push('Phone number must be atleast 6 numbers.');
        }
        return errors;
      },
      passwordErrors() {
        const errors = [];
        if (!this.v.password.$dirty) {
          return errors;
        }
        if (!this.v.password.required) {
          errors.push('Password is required.');
        }
        return errors;
      },
      roleIdErrors() {
        const errors = [];
        if (!this.v.roleId.$dirty) {
          return errors;
        }
        if (!this.v.roleId.required) {
          errors.push('Account role is required.');
        }
        return errors;
      },
      statusIdErrors() {
        const errors = [];
        if (!this.v.statusId.$dirty) {
          return errors;
        }
        if (!this.v.statusId.required) {
          errors.push('Account status is required.');
        }
        return errors;
      },
      positionIdErrors() {
        const errors = [];
        if (!this.v.positionId.$dirty) {
          return errors;
        }
        if (!this.v.positionId.required) {
          errors.push('Employee position is required.');
        }
        return errors;
      },
      isExistingBroker() {
        return isNum(this.value.id);
      },
    },
    methods: {
      togglePasswordFieldType() {
        this.canSeePassword = !this.canSeePassword;
      },
      update(key, value) {
        this.$emit('input', { ...this.value, [key]: value });
      },
    },
  };
</script>

<template>
  <div>
    <div>
      <h4>{{ $t('broker_field_group_personal') }}</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-text-field
            :value="value.firstName" @input="update('firstName', $event)"
            :label="$t('broker_field_first_name')" clearable
            type="text" :error-messages="firstNameErrors"
          />
        </v-col>

        <v-col cols="3">
          <v-text-field
            :value="value.lastName" @input="update('lastName', $event)"
            :label="$t('broker_field_last_name')" clearable
            type="text" :error-messages="lastNameErrors"
          />
        </v-col>
      </v-row>
    </v-container>

    <div>
      <h4>{{ $t('broker_field_group_contact') }}</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-text-field
            :value="value.email" @input="update('email', $event)"
            :label="$t('broker_field_email')" clearable
            type="text" :error-messages="emailErrors"
          />
        </v-col>

        <v-col cols="1">
          <v-text-field
            :value="value.phonePrefix" @input="update('phonePrefix', $event)"
            prepend-inner-icon="mdi-phone-plus-outline"
            type="number" :error-messages="phonePrefixErrors"
          />
        </v-col>

        <v-col cols="2">
          <v-text-field
            :value="value.phoneNumber" @input="update('phoneNumber', $event)"
            :label="$t('broker_field_phone_number')" clearable
            type="number" :error-messages="phoneNumberErrors"
          />
        </v-col>
      </v-row>
    </v-container>

    <div>
      <h4>{{ $t('broker_field_group_account') }}</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-text-field
            :value="value.password" @input="update('password', $event)"
            :label="$t('broker_field_password')" clearable
            :append-icon="canSeePassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="canSeePassword ? 'text' : 'password'" :error-messages="passwordErrors"
            @click:append="togglePasswordFieldType"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-select
            :value="value.roleId" @change="update('roleId', $event)"
            :items="userRolesList" item-value="id"
            :label="$t('broker_field_role')" clearable
            :error-messages="roleIdErrors"
          >
            <template #selection="data">{{ $t(data.item.slug) }}</template>
            <template #item="data">{{ $t(data.item.slug) }}</template>
          </v-select>
        </v-col>

        <v-col cols="3">
          <v-select
            :value="value.statusId" @change="update('statusId', $event)"
            :items="accountStatusList" item-value="id"
            :label="$t('broker_field_status')" clearable
            :disabled="!isExistingBroker" :error-messages="statusIdErrors"
          >
            <template #selection="data">{{ $t(data.item.slug) }}</template>
            <template #item="data">{{ $t(data.item.slug) }}</template>
          </v-select>
        </v-col>

        <v-col cols="3">
          <v-select
            :value="value.positionId" @change="update('positionId', $event)"
            :items="employeeTypesList" item-value="id"
            :label="$t('broker_field_position')" clearable
            :error-messages="positionIdErrors"
          >
            <template #selection="data">{{ $t(data.item.slug) }}</template>
            <template #item="data">{{ $t(data.item.slug) }}</template>
          </v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
