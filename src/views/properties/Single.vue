<script>
  import currencies from '@/configs/currencies';
  import propertyTypes from '@/configs/propertyTypes';
  import constructionTypes from '@/configs/constructionTypes';
  import amenditiesList from '@/configs/amendities';
  import mockedProperty from '@/mocks/propertyDetails';

  export default {
    name: 'PropertySingle',
    props: {
      property: {
        type: Object,
        default: () => ({}),
      }
    },
    data() {
      return {
        currencies,
        propertyTypes,
        constructionTypes,
        amenditiesList,
        item: null,
        isLoaded: false,
      };
    },
    computed: {
      availableAmendities() {
        return this.item.amendities.filter((item) => item);
      },
    },
    created() {
      this.extractPropertyDetails();
    },
    methods: {
      extractPropertyDetails() {
        const { property } = this;
        const augmentData = mockedProperty.find(({ id }) => id === this.$route.params.id);

        const nextItem = {
          ...property,
          ...augmentData,
        };

        this.item = nextItem;
        this.isLoaded = true;
      },
    },
  };
</script>

<template>
  <LoggedFrame>
    <!-- <template v-slot:actions>
      property
    </template> -->

    <div class="px-10 py-8" v-if="isLoaded">

      <div class="property__head">
        <div>
          <v-card class="mr-5">
            <v-img
              :src="item.cover"
              class="property-image"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-actions>
                <div class="pl-2 text-h6 white--text">{{ currencies[item.priceCurrencyId].symbol }}{{ item.priceAmount }}</div>
              </v-card-actions>
            </v-img>
          </v-card>
        </div>

        <div>
          <div>
            <h2>{{ $t(propertyTypes[item.propertyTypeId].slug) }}</h2>
          </div>
          <div class="subtitle-2 mb-5">
            <ul class="details-list">
              <li>{{ item.measurementValue }}m<sup>2</sup></li>
              <li>{{ item.roomCount }} bedrooms</li>
              <li>{{ item.bathCount }} baths</li>
            </ul>
          </div>

          <div class="mb-2" v-if="$ability.can('list', 'properties')">
            <v-icon small>mdi-map-marker</v-icon>
            <span class="font-weight-bold mr-2">Varna</span>
            <span class="caption">
              {{ `${item.street} ${item.streetNum}, entrance: ${item.entrance}, floor: ${item.onFloor}` }}
            </span>
          </div>

          <div class="mb-8">
            <v-icon>mdi-wrench-outline</v-icon>
            <span class="ml-1 body-2">{{ $t(constructionTypes[item.constructionId].slug) }}</span>
          </div>

          <div class="amendities-list">
            <div
              v-for="(item, index) in availableAmendities" :key="index"
              class="mb-2"
            >
              <v-icon>{{ `mdi-${amenditiesList[item].icon}` }}</v-icon>
              <span class="ml-1 body-2">{{ $t(amenditiesList[item].slug) }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </LoggedFrame>
</template>

<style lang="scss">
  .property {
    &__head {
      display: flex;

      .details-list {
        display: inline;
        list-style: none;
        padding: 0;

        li {
          display: inline;

          &:not(:last-child):after {
            padding: 0 4px;
            content: '\2022';
          }
        }
      }
    }
  }
</style>
