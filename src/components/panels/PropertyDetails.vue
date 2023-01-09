<template>
  <div>
    <div>
      <h4>Details</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-select
            v-model="property.details.typeId"
            :items="propertyTypes"
            item-text="title" item-value="id"
            label="Property Type"
            clearable
          />
        </v-col>

        <v-col cols="3">
          <v-select
            v-model="property.details.constructionId"
            :items="constructionTypes"
            item-text="title" item-value="id"
            label="Construction"
            clearable
          />
        </v-col>

        <v-col cols="2">
          <v-autocomplete
            v-model="property.details.constructionYear"
            :items="constructionYearRange"
            label="Year"
            clearable
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model.number="property.price.amount"
            label="Price" clearable
            type="number" min="0"
          />
        </v-col>

        <v-col cols="2">
          <v-select
            v-model="property.price.currency"
            :items="currencies"
            item-text="symbol" item-value="id"
            label="Currency"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-autocomplete
            v-model="property.details.rooms"
            :items="roomRange"
            label="Total Rooms" dense
            type="number" min="1"
          />
        </v-col>

        <v-col cols="2">
          <v-autocomplete
            v-model="property.details.bedrooms"
            :items="roomRange"
            label="Bedrooms" dense
            type="number" min="0"
          />
        </v-col>

        <v-col cols="2">
          <v-autocomplete
            v-model="property.details.baths"
            :items="roomRange"
            label="Bathrooms" dense
            type="number" min="0"
          />
        </v-col>

        <v-spacer />

        <v-col cols="2">
          <v-text-field
            v-model.number="property.measurements.amount"
            label="Area"
            type="number" min="1"
            clearable dense
          />
        </v-col>

        <v-col cols="2">
          <v-select
            v-model="property.measurements.unit"
            :items="residentialUnits"
            item-text="shortTitle" item-value="id"
            label="Unit" dense
          />
        </v-col>

        <v-col>
          <v-checkbox
            v-model="property.measurements.isExact"
            label="Exact" dense
          />
        </v-col>
      </v-row>
    </v-container>

    <div class="my-6">
      <h4>Amendities</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col
          v-for="(item, index) in propertyAmendities" :key="index"
          cols="2"
        >
          <v-chip
            medium
            :outlined="!item.isSet"
            :color="item.isSet ? 'pink' : 'secondary'"
            :text-color="item.isSet ? 'white' : 'secondary'"
            @click.prevent="setAmendityStatus(index)"
          >
            <v-icon left small>{{ `mdi-${item.icon}` }}</v-icon>
            {{ item.title }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>

    <div class="my-6">
      <h4>Location</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-select
            v-model="property.location.regionId"
            :items="[{ id: 1, label: 'Varna' }]"
            item-text="label" item-value="id"
            label="Region"
            dense
            disabled
          />
        </v-col>

        <v-col cols="3">
          <v-select
            v-model="property.location.cityId"
            :items="[{ id: 1, label: 'Varna' }]"
            item-text="label" item-value="id"
            label="City"
            dense
            disabled
          />
        </v-col>

        <v-col cols="4">
          <v-autocomplete
            v-model="property.location.neighbourhoodId"
            :items="varnaNeighbourhoods"
            item-text="label" item-value="id"
            label="Neighbourhood"
            dense
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="10">
          <v-text-field
            v-model="property.location.address"
            label="Address" dense
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="10">
          <v-textarea
            v-model="property.moreDetails"
            label="Text" dense
          />
        </v-col>
      </v-row>
    </v-container>

    <v-btn @click="validateProperty">Validate</v-btn>
  </div>
</template>

<script>
  import uid from 'uid';
  import propertyTypes from '@/configs/propertyTypes';
  import currencies from '@/configs/currencies';
  import constructionTypes from '@/configs/constructionTypes';
  import residentialUnits from '@/configs/residentialUnits';
  import propertyAmendities from '@/configs/amendities';
  import { regions as varnaNeighbourhoods } from '@/configs/regions/varna';

  export default {
    name: 'PropertyDetails',
    data() {
      return {
        propertyTypes: Object.values(propertyTypes),
        currencies: Object.values(currencies),
        constructionTypes: Object.values(constructionTypes),
        residentialUnits: Object.values(residentialUnits),
        constructionYearRange: this.generateYearRange(),
        roomRange: Array.from({ length: 10 }, (_, i) => i + 1),
        propertyAmendities: Object.values(propertyAmendities).map((item) => ({ ...item, isSet: false })),
        varnaNeighbourhoods,
        property: {
          details: {
            typeId: null,
            constructionId: null,
            constructionYear: null,
            rooms: null,
            bedrooms: null,
            baths: null,
          },
          price: {
            amount: null,
            currency: null,
          },
          measurements: {
            amount: null,
            unit: null,
            isExact: false,
          },
          location: {
            regionId: 1,
            cityId: 1,
            neighbourhoodId: null,
            address: '',
          },
          moreDetails: '',
        }
      };
    },
    created() {
      this.generateYearRange();
    },
    methods: {
      generateYearRange() {
        const currentYear = (new Date()).getFullYear();
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

        return range(currentYear, currentYear - 120, -1);
      },
      setAmendityStatus(index) {
        const itemValue = this.propertyAmendities[index].isSet;
        this.propertyAmendities[index].isSet = !itemValue;
      },
      validateProperty() {
        const nextProperty = {
          id: uid(),
          ...this.property,
          amendities: this.propertyAmendities.filter(({ isSet }) => isSet).map(({ id }) => id),
        };

        console.log(nextProperty);
      },
    },
  };
</script>

<style lang="scss">

</style>
