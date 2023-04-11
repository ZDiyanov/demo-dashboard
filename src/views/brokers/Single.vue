<script>
  import { mapGetters, mapActions } from 'vuex';
  import { validationMixin } from 'vuelidate';
  import { validationSet as brokerValidationSet } from '@/configs/brokers';
  import { isStr, isNum, toInt } from '@/utils';
  import BrokerDetailsForm from '@/components/forms/BrokerDetails';

  export default {
    name: 'BrokersSingle',
    mixins: [validationMixin],
    components: { BrokerDetailsForm },
    data() {
      return {
        broker: {},
        isLoading: false,
      };
    },
    validations() {
      return { broker: brokerValidationSet };
    },
    computed: {
      ...mapGetters({ activeItem: 'brokers/activeItem' }),
    },
    created() {
      this.setBrokerData();
    },
    methods: {
      ...mapActions({
        updateBroker: 'brokers/updateItem',
        getBroker: 'brokers/getItem',
      }),
      canSubmitBroker() {
        const { firstName, lastName, email, phonePrefix, phoneNumber, password, roleId, statusId, positionId } = this.broker;

        return isStr(firstName)
          && isStr(lastName)
          && isStr(email)
          && isStr(phonePrefix)
          && isStr(phoneNumber)
          && isStr(password)
          && isNum(roleId)
          && isNum(statusId)
          && isNum(positionId);
      },
      saveBrokerData() {
        this.$v.broker.$touch();

        if (!this.canSubmitBroker() || this.$v.broker.$error || this.$v.broker.pending) {
          return false;
        }

        this.updateBroker(this.broker)
          .then((res) => {
            console.log('broker updated!');
            console.log(res);

            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      setBrokerData() {
        const { activeItem } = this;
        const { id } = this.$route.params;

        if (isNum(activeItem.id) && activeItem.id === toInt(id)) {
          this.broker = activeItem;
          return true;
        }

        this.isLoading = true;

        this.getBroker(id)
          .then(() => {
            this.broker = { ...this.activeItem };
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
      <v-btn elevation="1" @click="saveBrokerData">
        <v-icon>mdi-content-save-outline</v-icon>
        {{ $t('action_btn_save') }}
      </v-btn>
    </template>

    <div class="px-10 py-8">
      <BrokerDetailsForm v-model="broker" :v="this.$v.broker" />
    </div>
  </LoggedFrame>
</template>
