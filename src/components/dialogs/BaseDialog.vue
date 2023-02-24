<script>
  import { isStr } from '@/utils';
  import Dialog from '@/components/dialogs/Dialog';

  export default {
    name: 'BaseDialog',
    components: { Dialog },
    props: {
      icon: {
        type: String,
        default: 'mdi-pencil',
      },
      title: {
        type: String,
        default() {
          return 'Item';
        }
      },
      width: {
        type: Number,
        default: 640,
      },
      isOn: {
        type: Boolean,
        default: false,
      },
      onClose: {
        type: Function,
        default: () => {},
      }
    },
    computed: {
      hasIcon() {
        const { icon } = this;
        return isStr(icon) && icon !== '';
      },
      dialogClass() {
        return `dialog base-dialog ${this.contentClass}`;
      },
    },
  };
</script>

<template>
  <div data-component="base-dialog">
    <Dialog
      :content-class="dialogClass"
      :max-width="width"
      :is-on="isOn"
      :on-close="onClose"
    >
      <template slot="title">
        <div class="item-title">
          <i v-if="hasIcon" :class="`mdi ${icon}`" />

          <h1>{{ title }}</h1>
        </div>

        <v-btn
          class="elevation-0 trigger close-dialog"
          @click="onClose"
        >
          <i class="mdi mdi-close" />
        </v-btn>
      </template>

      <div
        slot="content"
        class="slot-wrap container content grid-list-lg"
      >
        <slot name="content" />
      </div>
    </Dialog>
  </div>
</template>

<style lang="scss">
  .dialog.base-dialog > .modal__backdrop > .modal__content {
    width: 820px;
    max-width: 100%;
    margin: 0 auto;
    background: white;

    > .modal__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      margin: 0 auto;
      color: grey;

      .item-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 12px;

        i {
          font-size: 28px;
          color: grey;
        }

        h1 {
          font-weight: 500;
          margin-left: 14px;
        }
      }

      .trigger.close-dialog {
        width: 60px;
        min-width: auto;
        height: 60px;
        border-radius: 50%;
        padding: 0;
        margin: 0 20px 0 0;
        background-color: transparent;

        i {
          margin: 0;
          font-size: 28px;
          color: grey;
        }

        &:before {
          background-color: transparent;
        }
      }
    }

    > .modal__body {
      .slot-wrap {
        padding: initial;
      }
    }
  }
</style>
