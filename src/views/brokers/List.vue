<script>
  import { mapGetters, mapActions } from 'vuex';
  import { isObj, isNum, isStr } from '@/utils';
  import {
    columnHeaders as columns,
    typesMap as employeeTypesMap,
  } from '@/configs/brokers';
  import BasicTable from '@/components/tables/Basic';
  import BaseDialog from '@/components/dialogs/BaseDialog';
  import BrokerDetailsPanel from '@/components/panels/BrokerDetails';

  export default {
    name: 'BrokersList',
    components: { BasicTable, BaseDialog, BrokerDetailsPanel },
    data() {
      return {
        columns,
        employeeTypesMap,
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
    methods: {
      ...mapActions(
        {
          getItems: 'brokers/getItems',
          setActiveItem: 'brokers/setActiveItem',
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
      createBroker() {
        this.$router.push({ name: 'brokerCreate' });
      },
      toggleDialog() {
        this.isDialogOn = !this.isDialogOn;
      },
      displayBrokerDetails(item) {
        this.setActiveItem(item);

        this.isDialogOn = true;
      },
      editBrokerDetails(item) {
        return this.setActiveItem(item)
          .then(() => {
            this.$router.push({
              name: 'broker',
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

        this.getBrokers(nextQuery);
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

        this.getBrokers(nextQuery);
      },
      getBrokers({ page = 1, order = 'asc', sort = '', search = '', perPage } = {}) {
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
            const { itemsMeta } = this.$store.getters['brokers/itemsData'];
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
      <v-btn elevation="1" @click="createBroker">
        <v-icon>mdi-briefcase-plus</v-icon>
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

          <template v-else-if="cell.id === 'position'">
            <v-chip :color="getColor(cell.item.positionId)" dark>
              {{ employeeTypesMap.get(cell.item.positionId).label }}
            </v-chip>
          </template>

          <template v-else-if="cell.id === 'phone'">
            {{ `+${cell.item.phonePrefix} ${cell.item.phoneNumber}` }}
          </template>

          <template v-else-if="cell.id === 'actions'">
            <v-btn icon @click.prevent="editBrokerDetails(cell.item)">
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
      :title="`${activeBroker.firstName} ${activeBroker.lastName}`" icon="mdi-briefcase"
      :is-on="isDialogOn" :on-close="toggleDialog"
    >
      <template #content>
        <BrokerDetailsPanel :broker="activeBroker" />
      </template>
    </BaseDialog>
  </LoggedFrame>
</template>
