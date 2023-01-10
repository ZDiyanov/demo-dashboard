<script>
  import currencies from '@/configs/currencies';
  import propertyTypes from '@/configs/propertyTypes';

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
        currencies,
        propertyTypes,
      };
    },
    methods: {
      goToDetails({ id, ...rest }) {
        this.$router.push({ name: 'property', params: { id, property: rest }, });
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
          @click.prevent="goToDetails(item)"
        >
          <v-img
            :src="item.details.cover"
            class="property-image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-actions>
              <div class="pl-2 text-h6 white--text">{{ propertyTypes[item.details.typeId].title }}</div>
              <v-spacer></v-spacer>
              <v-btn v-if="showStarredBtn" icon>
                <v-icon class="white--text">mdi-star</v-icon>
              </v-btn>
            </v-card-actions>
          </v-img>

          <v-card-title v-if="showPrice">{{ currencies[item.price.currency].symbol }}{{ item.price.amount }}</v-card-title>
          <v-card-subtitle v-if="showDetails">
            <ul class="details-list">
              <li>{{ item.measurements.amount }}m<sup>2</sup></li>
              <li>{{ item.details.rooms }} bedrooms</li>
              <li>{{ item.details.baths }} baths</li>
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
