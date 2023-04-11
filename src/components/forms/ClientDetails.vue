<script>
  import { isNum } from '@/utils';
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
      typeIdErrors() {
        const errors = [];
        if (!this.v.typeId.$dirty) {
          return errors;
        }
        if (!this.v.typeId.required) {
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
      companyNameErrors() {
        const errors = [];
        if (!this.v.companyName.$dirty) {
          return errors;
        }
        if (!this.v.companyName.required) {
          errors.push('Company name is required.');
        }
        return errors;
      },
      uicNumberErrors() {
        const errors = [];
        if (!this.v.uicNumber.$dirty) {
          return errors;
        }
        return errors;
      },
      companyAddressErrors() {
        const errors = [];
        if (!this.v.companyName.$dirty) {
          return errors;
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
      budgetAmountErrors() {
        const errors = [];
        if (!this.v.budgetAmount.$dirty) {
          return errors;
        }
        if (!this.v.budgetAmount.required) {
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
      isOfTypePerson() {
        const { typeId } = this.value;
        return isNum(typeId) && typeId === 1;
      },
      isOfTypeCompany() {
        const { typeId } = this.value;
        return isNum(typeId) && typeId === 2;
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
    <div>
      <h4>{{ $t('client_field_group_profile') }}</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-select
            :value="value.typeId" @change="update('typeId', $event)"
            :items="clientTypesList" item-value="id"
            :label="$t('client_field_type')" clearable
            type="text" :error-messages="typeIdErrors"
          >
            <template #selection="data">{{ $t(data.item.slug) }}</template>
            <template #item="data">{{ $t(data.item.slug) }}</template>
          </v-select>
        </v-col>
      </v-row>
    </v-container>

    <template v-if="isOfTypePerson">
      <div>
        <h4>{{ $t('client_field_group_personal') }}</h4>
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
    </template>

    <template v-if="isOfTypeCompany">
      <div>
        <h4>{{ $t('client_field_group_company') }}</h4>
      </div>

      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <v-text-field
              :value="value.companyName" @input="update('companyName', $event)"
              :label="$t('client_field_company_name')" clearable
              type="text" :error-messages="companyNameErrors"
            />
          </v-col>

          <v-col cols="3">
            <v-text-field
              :value="value.uicNumber" @input="update('uicNumber', $event)"
              :label="$t('client_field_uic_number')" clearable
              type="text" :error-messages="uicNumberErrors"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              :value="value.companyAddress" @input="update('companyAddress', $event)"
              :label="$t('client_field_company_address')" clearable
              type="text" :error-messages="companyAddressErrors"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>

    <div>
      <h4>{{ $t('client_field_group_contact') }}</h4>
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
      <h4>{{ $t('client_field_group_budget') }}</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-text-field
            :value="value.budgetAmount" @input="update('budgetAmount', $event)"
            :label="$t('client_field_budget_value')" clearable
            type="text" :error-messages="budgetAmountErrors"
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
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-checkbox
            :value="value.isOwner" @change="update('isOwner', $event)"
            :label="$t('client_field_is_owner')" dense
          />
        </v-col>

        <v-col cols="3">
          <v-checkbox
            :value="value.isBroker" @change="update('isBroker', $event)"
            :label="$t('client_field_is_broker')" dense
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
