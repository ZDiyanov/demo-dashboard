<script>
  import { mapGetters, mapActions } from 'vuex';
  import { isObj, isNum, isStr } from '@/utils';
  import {
    columnHeaders as columns,
    typesMap as clientTypesMap,
  } from '@/configs/clients';
  import BasicTable from '@/components/tables/Basic';
  import BaseDialog from '@/components/dialogs/BaseDialog';
  import ClientDetailsPanel from '@/components/panels/ClientDetails';

  export default {
    name: 'ClientsList',
    components: { BasicTable, BaseDialog, ClientDetailsPanel },
    data() {
      return {
        columns,
        clientTypesMap,
        pagination: {
          descending: false,
          page: 1,
          rowsPerPage: 5,
          sortBy: '',
          totalItems: 0,
          search: '',
        },
        query: {},
        totalPages: 0,
        isLoading: false,
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
    methods: {
      ...mapActions(
        {
          getItems: 'clients/getItems',
          setActiveItem: 'clients/setActiveItem',
        },
      ),
      getColor(variation) {
        let color;

        switch (variation) {
          case 1:
            color = 'green';
            break;
          case 2:
            color = 'blue';
            break;
          default:
            color = 'grey';
        }

        return color;
      },
      createClient() {
        this.$router.push({ name: 'clientCreate' });
      },
      toggleDialog() {
        this.isDialogOn = !this.isDialogOn;
      },
      displayClientDetails(item) {
        this.setActiveItem(item);

        this.isDialogOn = true;
      },
      editClientDetails(item) {
        return this.setActiveItem(item)
          .then(() => {
            this.$router.push({
              name: 'client',
              params: { id: item.id },
            });

            return item;
          });
      },
      onUpdatePagination({ page, descending, sortBy, rowsPerPage }) {
        const { query, pagination } = this;
        const nextQuery = {
          ...query,
          page,
          order: descending ? 'desc' : 'asc',
          sort: isStr(sortBy) ? sortBy : pagination.sortBy,
          perPage: rowsPerPage,
        };

        this.query = nextQuery;

        this.getClients(nextQuery);
      },
      onChangePage(page) {
        const { query, pagination } = this;
        const { descending, sortBy } = pagination;
        const nextQuery = {
          ...query,
          page,
          order: descending ? 'desc' : 'asc',
          sort: sortBy,
        };

        this.query = nextQuery;

        this.getClients(nextQuery);
      },
      getClients({ page = 1, order = 'asc', sort = '', search = '', perPage } = {}) {
        const query = {
          page,
          order,
          sort,
          search,
          perPage,
        };

        this.isLoading = true;
        this.pagination.descending = order === 'desc';

        if (sort !== '') {
          this.pagination.sortBy = sort;
        }

        this.getItems(query)
          .then((res) => {
            const { itemsMeta } = this.$store.getters['clients/itemsData'];
            const { total, current_page, last_page } = itemsMeta;

            this.isLoading = false;

            this.pagination.page = current_page;
            this.pagination.totalItems = total;
            this.totalPages = last_page;

            return res;
          })
          .catch((err) => {
            this.isLoading = false;
            return err;
          });
      },
    },
  };
</script>

<template>
  <LoggedFrame>
    <template v-slot:actions>
      <v-btn elevation="1" @click="createClient">
        <v-icon>mdi-account-plus</v-icon>
        {{ $t('action_btn_create') }}
      </v-btn>
    </template>

    <div class="px-10 py-8">
      <BasicTable
        :columns="columns" :items="items"
        :pagination="pagination" :pages="totalPages"
        :is-loading="isLoading" has-custom-items-template
        :on-update-pagination="onUpdatePagination" :on-change-page="onChangePage"
      >
        <template #item-cell="{ cell }">
          <template v-if="cell.id === 'name'">
            {{ `${cell.item.firstName} ${cell.item.lastName}` }}
          </template>

          <template v-else-if="cell.id === 'type'">
            <v-chip :color="getColor(cell.item.typeId)" dark>
              {{ clientTypesMap.get(cell.item.typeId).label }}
            </v-chip>
          </template>

          <template v-else-if="cell.id === 'phone'">
            {{ `+${cell.item.phonePrefix} ${cell.item.phoneNumber}` }}
          </template>

          <template v-else-if="cell.id === 'actions'">
            <v-btn icon @click.prevent="editClientDetails(cell.item)">
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
      :title="`${activeClient.firstName} ${activeClient.lastName}`" icon="mdi-account"
      :is-on="isDialogOn" :on-close="toggleDialog"
    >
      <template #content>
        <ClientDetailsPanel :client="activeClient" />
      </template>
    </BaseDialog>
  </LoggedFrame>
</template>
