<template>
  <div
    role="dialog"
    tabIndex="-1"
    :class="componentClass()"
  >
    <div
      class="modal__backdrop"
      @click="onClickBackdrop"
    >
      <div
        class="modal__content"
        @click="onClickContent"
      >
        <div class="modal__header">
          <slot name="title" />
        </div>

        <div class="modal__body">
          <slot name="content" />
        </div>

        <div class="modal__footer">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { isNonEmptyStr, isFunc, hidePageScroll, showPageScroll } from '@/utils';

  const { addEventListener, removeEventListener } = window;

  export default {
    name: 'Dialog',
    props: {
      contentClass: {
        type: String,
        default: null,
      },
      isOn: {
        type: Boolean,
        default: false,
      },
      isCloseOnEscapeKey: {
        type: Boolean,
        default: true,
      },
      isCloseOnOutsideClick: {
        type: Boolean,
        default: true,
      },
      onClose: {
        type: Function,
        default: null,
      }
    },
    computed: {
      hasContentClass() {
        return isNonEmptyStr(this.contentClass);
      },
      hasOnClose() {
        return isFunc(this.onClose);
      }
    },
    watch: {
      isOn(nextIsOn) {
        this.togglePageScroll(nextIsOn);
      }
    },
    created() {
      if (this.isCloseOnEscapeKey) {
        this.attachKeypressListener();
      }
    },
    beforeDestroy() {
      if (this.isCloseOnEscapeKey) {
        this.detachKeypressListener();
      }
    },
    methods: {
      attachKeypressListener() {
        addEventListener('keydown', this.closeOnKeyPress);
      },
      detachKeypressListener() {
        removeEventListener('keydown', this.closeOnKeyPress);
      },
      togglePageScroll(isOn) {
        if (isOn) {
          hidePageScroll();
        } else {
          showPageScroll();
        }
      },
      closeOnKeyPress({ key }) {
        const { hasOnClose, isOn } = this;

        if (hasOnClose && isOn && key === 'Escape') {
          this.onClose();
        }
      },
      onClickBackdrop() {
        const { isCloseOnOutsideClick, hasOnClose, isOn } = this;

        if (isCloseOnOutsideClick && hasOnClose && isOn) {
          this.onClose();
        }
      },
      onClickContent(event) {
        event.stopPropagation();
      },
      componentClass() {
        return {
          modal: true,
          'modal--active': this.isOn,
          [this.contentClass]: this.hasContentClass,
        };
      }
    }
  };
</script>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 0;
    z-index: 1200;
    pointer-events: none;
    overflow: hidden;

    > .modal__backdrop {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(66, 66, 66, 0.55);
      transition: opacity cubic-bezier(0.55, 0, 0.1, 1) 0.5s;

      > .modal__content {
        display: flex;
        min-height: 0;
        max-width: 100%;
        flex-direction: column;
        justify-content: flex-start;
        background: white;
        border-radius: 5px;

        > .modal__header {
          position: sticky;
          top: 0;
          flex: 0 0 auto;
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          z-index: 10;

          > * {
            padding: 20px;
          }
        }

        > .modal__body {
          min-height: auto;
          flex: 0 1 auto;
          overflow: auto;
          -webkit-overflow-scrolling: touch;

          > * {
            padding: 20px;
          }
        }

        > .modal__footer {
          position: sticky;
          bottom: 0;
          flex: 0 0 auto;

          > div {
            padding: 20px;
          }
        }
      }
    }

    &.modal--active {
      right: 0;
      bottom: 0;
      pointer-events: auto;
      height: auto;

      & > .modal__backdrop {
        opacity: 1;
      }
    }
  }

</style>
