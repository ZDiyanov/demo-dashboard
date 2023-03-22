<script>
  import { currenciesMap as currencyMap } from '@/configs/currencies';
  import {
    typesMap as propertyTypesMap,
    constructionMap as constructionTypesMap,
    // unitsMap as residentialUnitsMap,
    amenities as propertyAmenitiesList,
    amenitiesMap as propertyAmenitiesMap,
  } from '@/configs/properties';

  export default {
    name: 'PropertySingle',
    props: {
      property: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        currencyMap,
        propertyTypesMap,
        constructionTypesMap,
        propertyAmenitiesList,
        propertyAmenitiesMap,
      };
    },
    computed: {
      availableAmendities() {
        // console.log(this.property.amenities);
        // console.log(this.propertyAmenitiesList.filter((item) => this.property.amenities.indexOf(item.id) === 1));
        return [];
        // return this.propertyAmenitiesList.filter((item) => this.property.amenities.indexOf(item.id) === -1);
      },
    },
  };
</script>

<template>
  <div class="px-10 py-8">
{{ property }}
    <div class="property__head">
      <div>
        <v-card class="mr-5">
          <v-img
            :src="property.cover"
            class="property-image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-actions>
              <div class="pl-2 text-h6 white--text">{{ currencyMap.get(property.priceCurrencyId).symbol }}{{ property.priceAmount }}</div>
            </v-card-actions>
          </v-img>
        </v-card>
      </div>

      <div>
        <div>
          <h2>{{ $t(constructionTypesMap.get(property.typeId).slug) }}</h2>
        </div>
        <div class="subtitle-2 mb-5">
          <ul class="details-list">
            <li>{{ property.areaValue }}m<sup>2</sup></li>
            <li>{{ property.bedrooms }} bedrooms</li>
            <li>{{ property.bathrooms }} bathrooms</li>
          </ul>
        </div>

        <div class="mb-2" v-if="$ability.can('list', 'properties')">
          <v-icon small>mdi-map-marker</v-icon>
          <span class="font-weight-bold mr-2">Varna</span>
          <span class="caption">
            <!-- {{ `${item.street} ${item.streetNum}, entrance: ${item.entrance}, floor: ${item.onFloor}` }} -->
            address
          </span>
        </div>

        <div class="mb-8">
          <v-icon>mdi-wrench-outline</v-icon>
          <span class="ml-1 body-2">{{ $t(constructionTypesMap.get(property.constructionId).slug) }}</span>
        </div>

        <div class="amendities-list">
          <div
            v-for="(item, index) in availableAmendities" :key="index"
            class="mb-2"
          >
            <v-icon>{{ `mdi-${propertyAmenitiesMap.get(item).icon}` }}</v-icon>
            <span class="ml-1 body-2">{{ $t(propertyAmenitiesMap.get(item).slug) }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
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
