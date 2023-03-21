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
          typeId: null,
          firstName: null,
          lastName: null,
          email: null,
          isOwner: false,
          isBroker: false,
          budgetAmount: null,
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
      return { client: clientValidationSet(this.client) };
    },
    methods: {
      ...mapActions({ createClient: 'clients/createItem' }),
      canSubmitClient() {
        const {
          typeId,
          email,
          isOwner, isBroker,
          phonePrefix, phoneNumber,
        } = this.client;

        return isNum(typeId)
          && isStr(email)
          && isBool(isOwner)
          && isBool(isBroker)
          && isStr(phonePrefix)
          && isStr(phoneNumber);
      },
      saveClientData() {
        this.$v.client.$touch();

        if (!this.canSubmitClient() || this.$v.client.$error || this.$v.client.pending) {
          return false;
        }

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
