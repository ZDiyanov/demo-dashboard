<script>
  import { mapGetters, mapActions } from 'vuex';
  import { validationMixin } from 'vuelidate';
  import { validationSet as clientValidationSet } from '@/configs/clients';
  import { isStr, isNum, isBool, toInt } from '@/utils';
  import ClientDetailsForm from '@/components/forms/ClientDetails';

  export default {
    name: 'ClientSingle',
    mixins: [validationMixin],
    components: { ClientDetailsForm },
    data() {
      return {
        client: {},
        isLoading: false,
      };
    },
    validations() {
      return { client: clientValidationSet(this.client) };
    },
    computed: {
      ...mapGetters({ activeItem: 'clients/activeItem' }),
    },
    created() {
      this.setClientData();
    },
    methods: {
      ...mapActions({
        updateClient: 'clients/updateItem',
        getClient: 'clients/getItem',
      }),
      canSubmitClient() {
        const {
          typeId,
          firstName, lastName,
          email,
          isOwner, isBroker,
          budgetAmount, budgetCurrencyId,
          phonePrefix, phoneNumber,
        } = this.client;

        return isNum(typeId)
          && isStr(firstName)
          && isStr(lastName)
          && isStr(email)
          // && isBool(isOwner)
          // && isBool(isBroker)
          // && isNum(budgetAmount)
          // && isNum(budgetCurrencyId)
          && isStr(phonePrefix)
          && isStr(phoneNumber);
      },
      saveClientData() {
        this.$v.client.$touch();

        if (!this.canSubmitClient() || this.$v.client.$error || this.$v.client.pending) {
          return false;
        }

        this.updateClient(this.client)
          .then((res) => {
            console.log('client updated!');
            console.log(res);

            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      setClientData() {
        const { activeItem } = this;
        const { id } = this.$route.params;

        if (isNum(activeItem.id) && activeItem.id === toInt(id)) {
          this.client = activeItem;
          return true;
        }

        this.isLoading = true;

        this.getClient(id)
          .then(() => {
            this.client = { ...this.activeItem };
            this.isLoading = false;

            return true;
          })
          .catch(() => {
            this.isLoading = false;
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
