<template>
  <v-dialog
    v-model="model"
    :width="fullscreen ? undefined : width"
    :min-width="minWidth"
    :max-width="maxWidth"
    :height="height"
    :persistent="persistent"
    :fullscreen="fullscreen"
    :activator="activator"
    :class="fullscreen ? '' : 'ma-2'"
    class="c-dialog"
    scrollable
  >
    <template v-if="slots['activator']" #activator="{ props }">
      <slot name="activator" :props="props"></slot>
    </template>

    <c-card
      :title="title"
      :title-size="titleSize"
      :subtitle="subtitle"
      :loading="loading"
      :color="color"
      :closable="closeButton"
      :mode="fullscreen ? 'fullscreen' : 'default'"
      :disabled="disabled"
      :has-tabs-header="hasTabsHeader"
      :force-scroll="forceScroll"
      :scrolling-content-vertical-padding="scrollingContentVerticalPadding"
      :wrap-title="wrapTitle"
      :no-content-top-padding="noContentTopPadding"
      max-width=""
      @close="model = false"
    >
      <template v-if="slots['header']" #header="props">
        <slot name="header" v-bind="props"></slot>
      </template>

      <template v-if="slots['content-full-width']" #content-full-width="props">
        <slot name="content-full-width" v-bind="props"></slot>
      </template>

      <template v-if="slots['prepend-actions']" #prepend-actions>
        <slot name="prepend-actions"></slot>
      </template>

      <template v-if="slots['actions']" #actions>
        <slot name="actions"></slot>
      </template>

      <template v-if="slots['default']" #default>
        <slot name="default"></slot>
      </template>
    </c-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { type ComponentPublicInstance, useSlots, watch } from "vue";
import CCard from "../CCard.vue";

const slots = useSlots();

/**
 * The model, whether the dialog should be shown or not.
 */
const model = defineModel<boolean>({ required: true });

/**
 * This component is a wrapper for the vuetify dialog with a card following the material design 3 specifications.
 *
 * @see https://m3.material.io/components/dialogs/overview
 */
withDefaults(
  defineProps<{
    /**
     * The title of the dialog.
     */
    title?: string;

    /**
     * The size of the title.
     */
    titleSize?: "normal" | "large";

    /**
     * Whether the title should wrap.
     */
    wrapTitle?: boolean;

    /**
     * The subtitle of the dialog.
     */
    subtitle?: string;

    /**
     * The width of the dialog
     */
    width?: string;

    /**
     * The min width of the dialog.
     */
    minWidth?: string;

    /**
     * The max width of the dialog.
     */
    maxWidth?: string;

    /**
     * The height of the dialog
     */
    height?: string;

    /**
     * Whether vertical padding should be applied to the content inside the card when the content is scrollable.
     *
     * Defaults to `true`.
     */
    scrollingContentVerticalPadding?: boolean;

    /**
     * Whether clicking outside the element or pressing esc key will close the dialog.
     */
    persistent?: boolean;

    /**
     * Changes layout for fullscreen display.
     */
    fullscreen?: boolean;

    /**
     * Whether the loading bar should be shown or not.
     */
    loading?: boolean;

    /**
     * If true, the card will always be in scrollable mode.
     *
     * This adds the dividers and always shows the scroll bar.
     */
    forceScroll?: boolean;

    /**
     * Applies specified color to the card - supports utility colors (for example `success` or `purple`) or css color (#033 or rgba(255, 0, 0, 0.5)).
     */
    color?: string;

    /**
     * If true, a close button will be added to the top right of the card which closes the dialog.
     */
    closeButton?: boolean;

    /**
     * Explicitly sets the overlay’s activator.
     *
     * For more information, see https://vuetifyjs.com/en/api/v-dialog/.
     */
    activator?: Element | "parent" | (string & {}) | ComponentPublicInstance;

    /**
     * Removes the ability to click or target the component.
     *
     * This also disables all buttons including the close-button, if shown.
     */
    disabled?: boolean;

    /**
     * Whether this card has tabs in the header.
     *
     * Will always display the divider and remove the padding to it.
     */
    hasTabsHeader?: boolean;

    /**
     * If true, removes the top padding of the card content area.
     *
     * Useful when using the `content-full-width` slot with full-height content.
     */
    noContentTopPadding?: boolean;
  }>(),
  {
    title: undefined,
    titleSize: "large",
    subtitle: undefined,
    width: "500px",
    minWidth: undefined,
    maxWidth: undefined,
    height: undefined,
    scrollingContentVerticalPadding: true,
    persistent: false,
    color: undefined,
    activator: undefined,
  },
);

/**
 * Watches the model to emit the `close` event when the model changes to `false`.
 */
watch(model, () => {
  if (!model.value) emit("close");
});

const emit = defineEmits<{
  /**
   * Event that is emitted when the dialog is closed.
   */
  (e: "close"): void;
}>();
</script>

<style lang="scss">
.c-dialog {
  .v-overlay__content {
    margin: 0 !important;
    max-width: 100% !important;
  }
}
</style>
