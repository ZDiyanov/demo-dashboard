<script>
  import { mapGetters, mapActions } from 'vuex';
  import { isObj, isNum } from '@/utils';
  import { columnHeaders as columns } from '@/configs/clients';
  import BasicTable from '@/components/tables/Basic';
  import BaseDialog from '@/components/dialogs/BaseDialog';
  import ClientDetailsPanel from '@/components/panels/ClientDetails';

  export default {
    name: 'ClientsList',
    components: { BasicTable, BaseDialog, ClientDetailsPanel },
    data() {
      return {
        columns,
        isDialogOn: false,
      };
    },
    computed: {
      ...mapGetters(
        {
          items: 'clients/items',
          activeClient: 'clients/activeItem',
        },
      ),
      hasActiveClient() {
        const { activeClient } = this;

        return isObj(activeClient)
          && isNum(activeClient.id);
      },
    },
    created() {
      this.getClients();
    },
    methods: {
      ...mapActions(
        {
          getClients: 'clients/getItems',
          getClient: 'clients/getItem',
        },
      ),
      createClient() {
        this.$router.push({ name: 'clientCreate' });
      },
      toggleDialog() {
        this.isDialogOn = !this.isDialogOn;
      },
      displayClientDetails({ id }) {
        this.getClient(id);
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
        @click="createClient"
      >
        <v-icon>mdi-account-plus</v-icon>
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

          <template v-else-if="cell.id === 'phone'">
            {{ `${cell.value.prefix} ${cell.value.value}` }}
          </template>

          <template v-else-if="cell.id === 'actions'">
            <v-btn icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>

            <v-btn icon @click.prevent="displayClientDetails(cell.item)">
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
      v-if="hasActiveClient"
      :title="`${activeClient.name.first} ${activeClient.name.last}`" icon="mdi-account"
      :is-on="isDialogOn" :on-close="toggleDialog"
    >
      <template #content>
        <ClientDetailsPanel :client="activeClient" />
      </template>
    </BaseDialog>
  </LoggedFrame>
</template>
