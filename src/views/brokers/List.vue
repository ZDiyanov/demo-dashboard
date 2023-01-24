<script>
  import { mapGetters, mapActions } from 'vuex';
  import { isObj, isNum } from '@/utils';
  import { columnHeaders as columns } from '@/configs/brokers';
  import BasicTable from '@/components/tables/Basic';
  import BaseDialog from '@/components/dialogs/BaseDialog';
  import BrokerDetailsPanel from '@/components/panels/BrokerDetails';

  export default {
    name: 'BrokersList',
    components: { BasicTable, BaseDialog, BrokerDetailsPanel },
    data() {
      return {
        columns,
        isDialogOn: false,
      };
    },
    computed: {
      ...mapGetters(
        {
          items: 'brokers/items',
          activeBroker: 'brokers/activeItem',
        },
      ),
      hasActiveBroker() {
        const { activeBroker } = this;

        return isObj(activeBroker)
          && isNum(activeBroker.id);
      },
    },
    created() {
      this.getBrokers();
    },
    methods: {
      ...mapActions(
        {
          getBrokers: 'brokers/getItems',
          getBroker: 'brokers/getItem',
        },
      ),
      createBroker() {
        this.$router.push({ name: 'brokerCreate' });
      },
      getColor() {
        return 'green';
      },
      toggleDialog() {
        this.isDialogOn = !this.isDialogOn;
      },
      displayBrokerDetails({ id }) {
        this.getBroker(id);
        this.isDialogOn = true;
      },
    },
  };
</script>

<template>
  <LoggedFrame>
    <template v-slot:actions>
      <v-btn
        elevation="1" disabled
        @click="createBroker"
      >
        <v-icon>mdi-briefcase-plus</v-icon>
        Create
      </v-btn>
    </template>

    <div class="px-10 py-8">
      <BasicTable
        :columns="columns" :items="items"
        has-custom-items-template
      >
        <template #item-cell="{ cell }">
          <template v-if="cell.id === 'name'">
            {{ `${cell.value.first} ${cell.value.last}` }}
          </template>

          <template v-else-if="cell.id === 'position'">
            <v-chip :color="getColor()" dark>
              {{ cell.value }}
            </v-chip>
          </template>

          <template v-else-if="cell.id === 'phone'">
            {{ `${cell.value.prefix} ${cell.value.value}` }}
          </template>

          <template v-else-if="cell.id === 'actions'">
            <v-btn icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>

            <v-btn icon @click.prevent="displayBrokerDetails(cell.item)">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </template>

          <template v-else>
            {{ cell.value }}
          </template>
        </template>
      </BasicTable>
    </div>

    <BaseDialog
      v-if="hasActiveBroker"
      :title="`${activeBroker.name.first} ${activeBroker.name.last}`" icon="mdi-briefcase"
      :is-on="isDialogOn" :on-close="toggleDialog"
    >
      <template #content>
        <BrokerDetailsPanel :broker="activeBroker" />
      </template>
    </BaseDialog>
  </LoggedFrame>
</template>
