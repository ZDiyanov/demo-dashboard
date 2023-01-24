<script>
  import { isObj, isNum } from '@/utils';

  export default {
    name: 'BrokerDetails',
    props: {
      broker: {
        type: Object,
        required: true,
      },
    },
    computed: {
      hasBroker() {
        const { broker } = this;

        return isObj(broker)
          && isNum(broker.id);
      },
    },
  };
</script>

<template>
  <div>
    {{ broker }}
  </div>
</template>
