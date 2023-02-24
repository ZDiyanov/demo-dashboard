<script>
  import { isObj, isNum } from '@/utils';

  export default {
    name: 'ClientDetails',
    props: {
      client: {
        type: Object,
        required: true,
      },
    },
    computed: {
      hasClient() {
        const { client } = this;

        return isObj(client)
          && isNum(client.id);
      },
    },
  };
</script>

<template>
  <div>
    {{ client }}
  </div>
</template>
