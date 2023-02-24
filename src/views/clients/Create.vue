<script>
  import { mapActions } from 'vuex';
  import { validationMixin } from 'vuelidate';
  import { validationSet as clientValidationSet } from '@/configs/clients';
  import { isStr, isNum, isBool } from '@/utils';
  import ClientDetailsForm from '@/components/forms/ClientDetails';

  export default {
    name: 'ClientCreate',
    mixins: [validationMixin],
    components: { ClientDetailsForm },
    data() {
      return {
        client: {
          id: null,
          type: null,
          firstName: null,
          lastName: null,
          email: null,
          isOwner: false,
          isBroker: false,
          budgetValue: null,
          budgetCurrencyId: null,
          phonePrefix: '359',
          phoneNumber: null,
          companyName: null,
          companyAddress: null,
          uicNumber: null,
        },
      };
    },
    validations() {
      return { client: clientValidationSet };
    },
    methods: {
      ...mapActions({ createClient: 'clients/createItem' }),
      canSubmitClient() {
        const {
          type,
          firstName, lastName,
          email,
          isOwner, isBroker,
          budgetValue, budgetCurrencyId,
          phonePrefix, phoneNumber,
        } = this.client;

        return isNum(type)
          && isStr(firstName)
          && isStr(lastName)
          && isStr(email)
          && isBool(isOwner)
          && isBool(isBroker)
          // && isNum(budgetValue)
          // && isNum(budgetCurrencyId)
          && isStr(phonePrefix)
          && isStr(phoneNumber);
      },
      saveClientData() {
        this.$v.client.$touch();

        if (!this.canSubmitClient() || this.$v.client.$error || this.$v.client.pending) {
          return false;
        }
console.log(this.client);
        this.createClient(this.client)
          .then((res) => {
            console.log('client created!');
            console.log(res);

            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  };
</script>

<template>
  <LoggedFrame>
    <template v-slot:actions>
      <v-btn elevation="1" @click="saveClientData">
        <v-icon>mdi-content-save-outline</v-icon>
        Save
      </v-btn>
    </template>

    <div class="px-10 py-8">
      <ClientDetailsForm v-model="client" :v="this.$v.client" />
    </div>
  </LoggedFrame>
</template>
