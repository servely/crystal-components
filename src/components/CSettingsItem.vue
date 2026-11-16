<template>
  <v-list-item
    :prepend-icon="prependIcon"
    :append-icon="clickable ? mdiChevronRight : undefined"
    :ripple="clickable || type === 'switch'"
    :disabled="disabled"
    :to="to"
    min-height="64"
    class="px-md-8 px-5"
    @click="click"
  >
    <div class="d-flex" :class="clickable ? '' : 'chevron-placeholder'">
      <div class="flex-grow-1">
        <!-- Label and value -->
        <slot>
          <v-row no-gutters>
            <v-col
              v-if="label"
              :sm="labelColumns"
              cols="12"
              class="d-flex align-center text-subtitle-2 text-grey-darken-1 mr-2"
            >
              <p>{{ label }}</p>
            </v-col>
            <v-col
              class="d-flex align-center"
              :class="valueVariant === 'subtitle' ? 'text-subtitle-2' : ''"
            >
              <p v-if="value">{{ value }}</p>
            </v-col>
          </v-row>
        </slot>
      </div>
    </div>

    <template v-if="type === 'switch' || slots['append']" #append>
      <slot v-if="slots['append']" name="append"></slot>
      <v-switch
        v-if="type === 'switch'"
        v-model="managedValue"
        color="primary"
        hide-details
      ></v-switch>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { mdiChevronRight } from "@mdi/js";
import type { RouteLocationRaw } from "vue-router";
import { useSlots } from "vue";

const slots = useSlots();

/**
 * The managed value is a value which will be managed by the settings item itself.
 *
 * It will be changed accordingly for some types like the `switch`.
 */
const managedValue = defineModel<boolean>();

/**
 * This component displays a list-item to display and manage settings.
 *
 * Slots:
 * - default: this slot replaces the default label and value
 * - append: this appends to the end of the item (replaces the chevron)
 */
const props = withDefaults(
  defineProps<{
    /**
     * The type of this settings-item.
     *
     * Changes the behaviour of this item. If a type is used, that adds input-like functionality (like a switch),
     * the `managedValue` as the input-value.
     */
    type?: "default" | "switch";

    /**
     * The label of this settings item.
     */
    label?: string;

    /**
     * The grid-columns to use for the label column.
     */
    labelColumns?: number;

    /**
     * The current set value of this option.
     */
    value?: string | boolean | null;

    /**
     * How the label is displayed.
     *
     * - default: displays the value as the actual value of this setting.
     * - subtitle: the value can be a longer subtitle to explain this setting.
     */
    valueVariant?: "default" | "subtitle";

    /**
     * The prepend-icon of this item.
     */
    prependIcon?: string;

    /**
     * Whether this settings item is clickable.
     *
     * Will show a chevron on the right side and emit the `click` event on click.
     */
    clickable?: boolean;

    /**
     * Denotes the target route of the link. You can find more information about the `to` prop on the vue-router documentation.
     */
    to?: RouteLocationRaw;

    /**
     * Removes the ability to click or target the component.
     */
    disabled?: boolean;
  }>(),
  {
    type: "default",
    label: undefined,
    labelColumns: 3,
    prependIcon: undefined,
    value: null,
    valueVariant: undefined,
    clickable: false,
    to: undefined,
  },
);

const emit = defineEmits<{
  /**
   * Event emitted when the user clicks on this list-item.
   */
  (e: "click"): void;
}>();

/**
 * Emits the click-event and changes the `managedValue`, if required.
 */
function click() {
  if (props.type === "switch") {
    managedValue.value = !managedValue.value;
  }

  // Emit event
  emit("click");
}
</script>

<style scoped lang="scss">
.chevron-placeholder {
  padding-right: 56px;
}
</style>
