<script>
  import { isNull, extractNestedProp } from '@/utils';

  export default {
    name: 'BasicTable',
    props: {
      columns: {
        type: Array,
        requred: true,
        default: () => [],
      },
      items: {
        type: Array,
        requred: true,
        default: () => [],
      },
      pages: {
        type: Number,
        required: true,
      },
      pagination: {
        type: Object,
        required: true,
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
      itemsPerPage: {
        type: Number,
        default: 5,
      },
      noDataLabel: {
        type: String,
        default() {
          return this.$t('data_table_no_results_label');
        },
      },
      loadingLabel: {
        type: String,
        default() {
          return this.$t('data_table_loading_results_label');
        },
      },
      perPageLabel: {
        type: String,
        default() {
          return this.$t('data_table_records_per_page_label');
        },
      },
      hasCustomItemsTemplate: {
        type: Boolean,
        default: false,
      },
      onUpdatePagination: {
        type: Function,
        default: () => {},
      },
      onChangePage: {
        type: Function,
        default: () => {},
      },
    },
    data() {
      return {
        footerConfig: {
          itemsPerPageText: this.perPageLabel,
          itemsPerPageOptions: [5, 10],
        },
      };
    },
    methods: {
      getColumnValue(item, columnValue) {
        if (isNull(columnValue)) {
          return columnValue;
        }

        return extractNestedProp(item, columnValue);
      },
      onUpdateOptions(options) {
        const nextOptions = {
          page: options.page,
          sortBy: options.sortBy[0],
          descending: options.sortDesc[0],
          rowsPerPage: options.itemsPerPage,
        };

        this.onUpdatePagination(nextOptions);
      },
      onUpdateSort(options) {},
      onUpdatePage(options) {},
    },
  };
</script>

<template>
  <v-data-table
    class="elevation-1"
    :headers="columns" :items="items"
    :server-items-length="pagination.totalItems"
    :sort-by="pagination.sortBy" :sort-desc="pagination.descending"
    :footer-props="footerConfig" :items-per-page="itemsPerPage"
    :loading-text="loadingLabel" :loading="isLoading"
    :no-data-text="noDataLabel"
    @update:options="onUpdateOptions" @update:sortBy="onUpdateSort"
    @update:page="onUpdatePage"
  >
      <template v-for="column in columns" v-slot:[`header.${column.value}`]>
        {{ $t(column.text) }}
      </template>

      <template slot="item" slot-scope="props">
        <tr>
          <td v-for="column in columns" :key="column.value">
            <slot
              v-if="hasCustomItemsTemplate"
              :cell="{
                id: column.type,
                item: props.item,
                value: getColumnValue(props.item, column.value),
                column
              }"
              name="item-cell"
            />

            <template v-else>
              {{ getColumnValue(props.item, column.value) }}
            </template>
          </td>
        </tr>
      </template>

      <template slot="no-results">
        <span class="no-results-box">
          {{ noDataLabel }}
        </span>
      </template>

      <template slot="no-data">
        <span class="no-results-box">
          {{ noDataLabel }}
        </span>
      </template>
  </v-data-table>
</template>
