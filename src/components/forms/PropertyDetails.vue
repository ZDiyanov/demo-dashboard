<script>
  import { currencies as currencyList } from '@/configs/currencies';
  import {
    types as propertyTypesList,
    construction as constructionTypesList,
    units as residentialUnitsList,
  } from '@/configs/properties';
  import { regions as varnaNeighbourhoods } from '@/configs/regions/varna';

  export default {
    name: 'PropertyDetails',
    props: {
      value: {
        type: Object,
        required: true,
        // validate the model
      },
      v: {
        type: Object,
      },
      amenities: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        propertyTypesList,
        constructionTypesList,
        residentialUnitsList,
        currencyList,
        constructionYearRange: this.generateYearRange(),
        roomRange: Array.from({ length: 10 }, (_, i) => i + 1),
        varnaNeighbourhoods,
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
      setAmenityStatus(index) {
        const itemValue = this.amenities[index].isSet;
        this.amenities[index].isSet = !itemValue;
      },
    },
  };
</script>

<template>
  <div>
    <div>
      <h4>Parameters</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-select
            v-model="value.typeId" :items="propertyTypesList"
            item-value="id" :label="$t('property_field_type')"
            clearable
          >
            <template #selection="data">{{ $t(data.item.slug) }}</template>
            <template #item="data">{{ $t(data.item.slug) }}</template>
          </v-select>
        </v-col>

        <v-col cols="3">
          <v-select
            v-model="value.constructionId" :items="constructionTypesList"
            item-value="id" :label="$t('property_field_construction')"
            clearable
          >
            <template #selection="data">{{ $t(data.item.slug) }}</template>
            <template #item="data">{{ $t(data.item.slug) }}</template>
          </v-select>
        </v-col>

        <v-col cols="2">
          <v-autocomplete
            v-model="value.constructionYear" :items="constructionYearRange"
            :label="$t('property_field_year')" clearable
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model.number="value.priceAmount"
            :label="$t('property_field_price')" clearable
            type="number" min="0"
          />
        </v-col>

        <v-col cols="2">
          <v-select
            v-model="value.priceCurrencyId"
            :items="currencyList" item-value="id"
            :label="$t('property_field_currency')"
          >
            <template #selection="data">{{ $t(data.item.slug) }}</template>
            <template #item="data">{{ $t(data.item.slug) }}</template>
          </v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-autocomplete
            v-model="value.roomsTotal" :items="roomRange"
            :label="$t('property_field_rooms')" dense
            type="number" min="1"
          />
        </v-col>

        <v-col cols="2">
          <v-autocomplete
            v-model="value.bedrooms" :items="roomRange"
            :label="$t('property_field_bedrooms')" dense
            type="number" min="0"
          />
        </v-col>

        <v-col cols="2">
          <v-autocomplete
            v-model="value.bathrooms" :items="roomRange"
            :label="$t('property_field_bathrooms')" dense
            type="number" min="0"
          />
        </v-col>

        <v-spacer />

        <v-col cols="2">
          <v-text-field
            v-model.number="value.areaValue"
            :label="$t('property_field_area_value')"
            type="number" min="1"
            clearable dense
          />
        </v-col>

        <v-col cols="2">
          <v-select
            v-model="value.areaUnitId" :items="residentialUnitsList"
            item-text="shortTitle" item-value="id"
            :label="$t('property_field_area_unit')" dense
          />
        </v-col>

        <v-col>
          <v-checkbox
            v-model="value.areaIsExact"
            :label="$t('property_field_area_exact_value')" dense
          />
        </v-col>
      </v-row>
    </v-container>

    <div class="my-6">
      <h4>Amenities</h4>
    </div>

    <v-container fluid>
      <v-row>
        <v-col
          v-for="(item, index) in amenities" :key="index"
          cols="2"
        >
          <v-chip
            medium
            :outlined="!item.isSet"
            :color="item.isSet ? 'pink' : 'secondary'"
            :text-color="item.isSet ? 'white' : 'secondary'"
            @click.prevent="setAmenityStatus(index)"
          >
            <v-icon left small>{{ `mdi-${item.icon}` }}</v-icon>
            {{ $t(item.slug) }}
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
            v-model="value.regionId" :items="[{ id: 1, label: 'Varna' }]"
            item-text="label" item-value="id"
            :label="$t('property_field_region')" dense
            disabled
          />
        </v-col>

        <v-col cols="3">
          <v-select
            v-model="value.cityId" :items="[{ id: 1, label: 'Varna' }]"
            item-text="label" item-value="id"
            :label="$t('property_field_city')" dense
            disabled
          />
        </v-col>

        <v-col cols="4">
          <v-autocomplete
            v-model="value.neighbourhoodId" :items="varnaNeighbourhoods"
            item-text="label" item-value="id"
            :label="$t('property_field_neighbourhood')" dense
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="10">
          <v-text-field
            v-model="value.address"
            :label="$t('property_field_address')" dense
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="10">
          <v-textarea
            v-model="value.notes"
            :label="$t('property_field_notes')" dense
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">

</style>
