<script>
  import { types as clientTypesList } from '@/configs/clients';
  import { currencies as currencyList } from '@/configs/currencies';

  export default {
    name: 'ClientDetailsForm',
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
        clientTypesList,
        currencyList,
      };
    },
    computed: {
      typeErrors() {
        const errors = [];
        if (!this.v.type.$dirty) {
          return errors;
        }
        if (!this.v.type.required) {
          errors.push('Type is required.');
        }
        return errors;
      },
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
      budgetValueErrors() {
        const errors = [];
        if (!this.v.budgetValue.$dirty) {
          return errors;
        }
        if (!this.v.budgetValue.required) {
          errors.push('Budget value is required.');
        }
        return errors;
      },
      budgetCurrencyIdErrors() {
        const errors = [];
        if (!this.v.budgetCurrencyId.$dirty) {
          return errors;
        }
        if (!this.v.budgetCurrencyId.required) {
          errors.push('Budget currency is required.');
        }
        return errors;
      },
    },
    methods: {
      update(key, value) {
        this.$emit('input', { ...this.value, [key]: value });
      },
    },
  };
</script>

<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-select
            :value="value.type" @change="update('type', $event)"
            :items="clientTypesList" item-value="id"
            :label="$t('client_field_type')" clearable
            type="text" :error-messages="typeErrors"
          >
            <template #selection="data">{{ $t(data.item.slug) }}</template>
            <template #item="data">{{ $t(data.item.slug) }}</template>
          </v-select>
        </v-col>
      </v-row>
    </v-container>

    <div>
      <h4>Personal</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-text-field
            :value="value.firstName" @input="update('firstName', $event)"
            :label="$t('client_field_first_name')" clearable
            type="text" :error-messages="firstNameErrors"
          />
        </v-col>

        <v-col cols="3">
          <v-text-field
            :value="value.lastName" @input="update('lastName', $event)"
            :label="$t('client_field_last_name')" clearable
            type="text" :error-messages="lastNameErrors"
          />
        </v-col>
      </v-row>
    </v-container>

    <div>
      <h4>Contact</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-text-field
            :value="value.email" @input="update('email', $event)"
            :label="$t('client_field_email')" clearable
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
            :label="$t('client_field_phone_number')" clearable
            type="number" :error-messages="phoneNumberErrors"
          />
        </v-col>
      </v-row>
    </v-container>

    <div>
      <h4>Budget</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-text-field
            :value="value.budgetValue" @input="update('budgetValue', $event)"
            :label="$t('client_field_budget_value')" clearable
            type="text" :error-messages="budgetValueErrors"
          />
        </v-col>

        <v-col cols="3">
          <v-select
            :value="value.budgetCurrencyId" @change="update('budgetCurrencyId', $event)"
            :items="currencyList" item-value="id"
            :label="$t('client_field_budget_currency')" clearable
            type="text" :error-messages="budgetCurrencyIdErrors"
          >
            <template #selection="data">{{ $t(data.item.slug) }}</template>
            <template #item="data">{{ $t(data.item.slug) }}</template>
          </v-select>
        </v-col>

        <v-col cols="2">
          <v-checkbox
            :value="value.isOwner" @change="update('isOwner', $event)"
            :label="$t('client_field_is_owner')" dense
          />
        </v-col>

        <v-col cols="2">
          <v-checkbox
            :value="value.isBroker" @change="update('isBroker', $event)"
            :label="$t('client_field_is_broker')" dense
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
