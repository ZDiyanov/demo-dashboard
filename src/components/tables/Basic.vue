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
      isLoading: {
        type: Boolean,
        default: false,
      },
      itemsPerPage: {
        type: Number,
        default: 10,
      },
      noDataLabel: {
        type: String,
        default() {
          return 'No data available';
        },
      },
      loadingLabel: {
        type: String,
        default() {
          return 'Loading ...';
        }
      },
      perPageLabel: {
        type: String,
        default() {
          return 'per page txt';
        }
      },
      hasCustomItemsTemplate: {
        type: Boolean,
        default: false
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
    },
  };
</script>

<template>
  <v-data-table
    :headers="columns" :items="items"
    :footer-props="footerConfig" :items-per-page="itemsPerPage"
    :loading-text="loadingLabel" :no-data-text="noDataLabel"
    :loading="isLoading" class="elevation-1"
  >
      <template v-for="column in columns" v-slot:[`header.${column.value}`]>
        {{ column.text }}
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
