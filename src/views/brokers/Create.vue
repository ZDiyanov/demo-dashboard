<script>
  import { mapActions } from 'vuex';
  import { validationMixin } from 'vuelidate';
  import { validationSet as brokerValidationSet } from '@/configs/brokers';
  import { isStr, isNum } from '@/utils';
  import BrokerDetailsForm from '@/components/forms/BrokerDetails';

  export default {
    name: 'BrokersCreate',
    mixins: [validationMixin],
    components: { BrokerDetailsForm },
    data() {
      return {
        broker: {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          phonePrefix: '359',
          phoneNumber: null,
          roleId: null,
          positionId: null,
          statusId: 1,
          password: null,
        },
      };
    },
    validations() {
      return { broker: brokerValidationSet };
    },
    methods: {
      ...mapActions({ createBroker: 'brokers/createItem' }),
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

        this.createBroker(this.broker)
          .then((res) => {
            console.log('broker created!');
            console.log(res);

            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  };
</script>

<template>
  <LoggedFrame>
    <template v-slot:actions>
      <v-btn elevation="1" @click="saveBrokerData">
        <v-icon>mdi-content-save-outline</v-icon>
        Save
      </v-btn>
    </template>

    <div class="px-10 py-8">
      <BrokerDetailsForm v-model="broker" :v="this.$v.broker" />
    </div>
  </LoggedFrame>
</template>
