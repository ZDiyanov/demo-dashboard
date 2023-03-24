<script>
  import { currenciesMap } from '@/configs/currencies';
  import { typesMap as propertyTypesMap } from '@/configs/properties';

  export default {
    name: 'CatalogueGrid',
    props: {
      items: {
        type: Array,
        required: true,
      },
      showPrice: {
        type: Boolean,
        default: false,
      },
      showStarredBtn: {
        type: Boolean,
        default: false,
      },
      showDetails: {
        type: Boolean,
        default: false,
      },
      showLocation: {
        type: Boolean,
        default: false,
      },
      dense: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        currenciesMap,
        propertyTypesMap,
      };
    },
    methods: {
      displayDetails(item) {
        this.$emit('property:display', item);
      },
    },
  };
</script>

<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex
        v-for="(item, index) in items" :key="index"
        d-flex :class="['xs12', 'sm6', 'md2']"
      >
        <v-card
          class="property-card" elevation="1"
          @click.prevent="displayDetails(item)"
        >
          <v-img
            src="https://thumbs.rynekpierwotny.pl/2fafa89d:Q6orjJrfdqBlAaxZtBb2JuQrPcc/1160x638/filters:upscale():format(jpg)/articles/gallery/image/1586/f0ab6f.jpg"
            class="property-image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-actions>
              <div class="pl-2 text-h6 white--text">{{ $t(propertyTypesMap.get(item.typeId).slug) }}</div>
              <v-spacer></v-spacer>
              <v-btn v-if="showStarredBtn" icon>
                <v-icon class="white--text">mdi-pencil</v-icon>
              </v-btn>
            </v-card-actions>
          </v-img>

          <v-card-title v-if="showPrice">{{ currenciesMap.get(item.priceCurrencyId).symbol }}{{ item.priceAmount }}</v-card-title>
          <v-card-subtitle v-if="showDetails">
            <ul class="details-list">
              <li>{{ item.areaValue }}m<sup>2</sup></li>
              <li>{{ item.bedrooms }} bedrooms</li>
              <li>{{ item.bathrooms }} baths</li>
            </ul>
          </v-card-subtitle>
          <v-card-text v-if="showLocation">
            <div>
              <v-icon small>mdi-map-marker</v-icon>
              <span class="font-weight-bold">Varna</span>
            </div>
            <div>Владислав Варненчик 1</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
  .property-card {
    width: 100%;

    .property-image {
      height: 200px;
      align-items: flex-end;
    }

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
</style>
