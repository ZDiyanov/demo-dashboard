<script>
  import { mapGetters, mapActions } from 'vuex';
  import { isObj, isNum, isStr } from '@/utils';
  import CatalogueGrid from '@/components/CatalogueGrid';

  export default {
    name: 'PropertiesIndex',
    components: { CatalogueGrid },
    data() {
       return {
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
          items: 'properties/items',
          activeProperty: 'properties/activeItem',
        },
      ),
      hasActiveProperty() {
        const { activeProperty } = this;

        return isObj(activeProperty)
          && isNum(activeProperty.id);
      },
    },
    methods: {
      ...mapActions(
        {
          getItems: 'properties/getItems',
          setActiveItem: 'properties/setActiveItem',
        },
      ),
      createProperty() {
        this.$router.push({ name: 'propertyCreate' });
      },
      toggleDialog() {
        this.isDialogOn = !this.isDialogOn;
      },
      displayPropertyDetails(item) {
        this.setActiveItem(item);

        this.isDialogOn = true;
      },
      editPropertyDetails(item) {
        return this.setActiveItem(item)
          .then(() => {
            this.$router.push({
              name: 'property',
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

        this.getProperties(nextQuery);
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

        this.getProperties(nextQuery);
      },
      getProperties({ page = 1, order = 'asc', sort = '', search = '', perPage } = {}) {
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
            const { itemsMeta } = this.$store.getters['properties/itemsData'];
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
      <v-btn
        elevation="1"
        @click="createProperty"
      >
        <v-icon>mdi-home-plus</v-icon>
        Create
      </v-btn>
    </template>

    <div class="px-10 py-8">

      <CatalogueGrid
        :items="items"
        show-price show-details
      />

    </div>
  </LoggedFrame>
</template>
