<script>
  import { mapActions } from 'vuex';
  import { validationMixin } from 'vuelidate';
  import {
    validationSet as propertyValidationSet,
    amenities as propertyAmenitiesList,
  } from '@/configs/properties';
  import { isNum } from '@/utils';
  import PropertyDetails from '@/components/forms/PropertyDetails';

  export default {
    name: 'PropertyCreate',
    mixins: [validationMixin],
    components: { PropertyDetails },
    data() {
      return {
        propertyAmenities: propertyAmenitiesList.map((item) => ({ ...item, isSet: false })),
        property: {
          id: null,
          typeId: null,
          constructionId: null,
          constructionYear: null,
          priceAmount: null,
          priceCurrencyId: null,
          roomsTotal: null,
          bedrooms: null,
          bathrooms: null,
          areaValue: null,
          areaUnitId: null,
          areaIsExact: false,
          amenities: [],
          regionId: 2,
          cityId: 2,
          neighbourhoodId: null,
          address: '',
          notes: '',
          brokerId: 10,
          clientId: 5,
          cover: null,
          gallery: [],
        },
      };
    },
    validations() {
      return { property: propertyValidationSet(this.property) };
    },
    methods: {
      ...mapActions({ createProperty: 'properties/createItem' }),
      canSubmitProperty() {
        const {
          typeId,
        } = this.property;

        return isNum(typeId);
      },
      savePropertyData() {
        const nextProperty = {
          ...this.property,
          amenities: this.propertyAmenities.filter(({ isSet }) => isSet).map(({ id }) => id),
        };

        // this.$v.property.$touch();

        if (!this.canSubmitProperty() || this.$v.property.$error || this.$v.property.pending) {
          return false;
        }

        this.createProperty(nextProperty)
          .then((res) => {
            console.log('property created!');
            console.log(res);

            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  };
</script>

<template>
  <LoggedFrame>
    <template v-slot:actions>
      <v-btn elevation="1" @click="savePropertyData">
        <v-icon>mdi-content-save-outline</v-icon>
        Save
      </v-btn>
    </template>

    <div class="px-10 py-8">
      <PropertyDetails
        v-model="property" :v="this.$v.property"
        :amenities="propertyAmenities"
      />
    </div>
  </LoggedFrame>
</template>
