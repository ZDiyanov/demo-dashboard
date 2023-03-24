<script>
  import { mapGetters } from 'vuex';
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
      ...mapGetters(
        {
          availableClients: 'clients/slimItems',
          availableBrokers: 'brokers/slimItems',
        },
      ),
      availableAmendities() {
        return this.propertyAmenitiesList.filter((item) => this.property.amenities.includes(item.id));
      },
      assignedClient() {
        return this.availableClients.find(({ id }) => id === this.property.clientId);
      },
      assignedBroker() {
        return this.availableBrokers.find(({ id }) => id === this.property.brokerId);
      },
    },
  };
</script>

<template>
  <div class="px-10 py-4">

    <div class="property__head">
      <div>
        <v-card class="mr-5">
          <v-img
            src="https://thumbs.rynekpierwotny.pl/2fafa89d:Q6orjJrfdqBlAaxZtBb2JuQrPcc/1160x638/filters:upscale():format(jpg)/articles/gallery/image/1586/f0ab6f.jpg"
            class="property-image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-actions>
              <div class="pl-2 text-h6 white--text">{{ currencyMap.get(property.priceCurrencyId).symbol }}{{ property.priceAmount }}</div>
            </v-card-actions>
          </v-img>
        </v-card>

        <div class="meta mt-6">
          <div class="mb-2">
            <v-icon>{{ `mdi-account` }}</v-icon>
            <span class="ml-1 body-2">
              {{ `${assignedClient.firstName} ${assignedClient.lastName} ( +${assignedClient.phonePrefix} ${assignedClient.phoneNumber} )` }}
            </span>
          </div>

          <div class="mb-2">
            <v-icon>{{ `mdi-briefcase` }}</v-icon>
            <span class="ml-1 body-2">
              {{ `${assignedBroker.firstName} ${assignedBroker.lastName}` }}
            </span>
          </div>
        </div>
      </div>

      <div>
        <div class="mb-8">
          <v-icon medium>mdi-map-marker</v-icon>
          <span class="font-weight-bold">Varna</span>
          <span>
            <!-- {{ `${item.street} ${item.streetNum}, entrance: ${item.entrance}, floor: ${item.onFloor}` }} -->
            , Бриз
          </span>
        </div>

        <div class="mb-2">
          <v-icon>mdi-wrench-outline</v-icon>
          <span class="ml-1 body-2">{{ $t(constructionTypesMap.get(property.constructionId).slug) }}</span>
        </div>

        <div class="subtitle-2 mb-8">
          <ul class="details-list">
            <li>{{ property.areaValue }}m<sup>2</sup></li>
            <li>{{ property.bedrooms }} bedrooms</li>
            <li>{{ property.bathrooms }} bathrooms</li>
          </ul>
        </div>

        <div class="amendities-list">
          <div
            v-for="(item, index) in availableAmendities" :key="index"
            class="mb-2"
          >
            <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
            <span class="ml-1 body-2">{{ $t(item.slug) }}</span>
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

      .property-image {
        max-width: 400px;
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
  }
</style>
