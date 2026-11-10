<!--
Copyright (c) 2025 by Servely UG (haftungsbeschränkt)
Copyright (c) 2024 by Crystal Creations GbR and Johannes Huther

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 -->
<template>
  <div>
    <v-snackbar
      :model-value="model"
      :timeout="snackbarTimeout"
      :location="location"
      :color="type"
      :z-index="zIndex"
      @update:model-value="onModelValueChange"
    >
      <slot></slot>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

/**
 * Available types for a snackbar.
 *
 * Either one of the defined types or a theme color.
 */
export type CSnackbarType = "error" | "success" | string;

/**
 * Available locations for a snackbar.
 */
export type CSnackbarLocation = "top" | "bottom";

/**
 * The model, whether the snackbar should be shown or not.
 */
const model = defineModel<boolean>({ required: true });

/**
 * This component is a wrapper for the vuetify snackbar.
 */
const props = withDefaults(
  defineProps<{
    /**
     * The {@link CSnackbarType} of this snackbar.
     *
     * The {@link CSnackbarType} changes the color and the timeout of this snackbar.
     */
    type?: CSnackbarType;

    /**
     * The {@link CSnackbarLocation} of this snackbar.
     */
    location?: CSnackbarLocation;

    /**
     * Timeout in milliseconds of this snackbar after which it will be hidden.
     */
    timeout?: number | "infinite" | null;

    /**
     * The z-index used for the component.
     *
     * Defaults to `2500` to be above dialogs (with a z-index of `2400`). (Vuetify default: `2000`)
     */
    zIndex?: string | number;
  }>(),
  {
    type: "error",
    location: "bottom",
    timeout: null,
    zIndex: 2500,
  },
);

const emit = defineEmits<{
  /**
   * Event emitted when the snackbar is closed.
   */
  (e: "closed"): void;
}>();

/**
 * Returns the timeout to use for this snackbar.
 *
 * If a custom {@link timeout} is given, this will be used.
 * If the custom {@link timeout} is `infinite`, `-1` is returned as written in the vuetify docs:
 * https://vuetifyjs.com/en/api/v-snackbar/#props-timeout
 *
 * Otherwise, the timeout is the default or depends on the {@link type}:
 * - error: 5000ms
 * - default: 3000ms
 */
const snackbarTimeout = computed<number>(() => {
  if (props.timeout) {
    if (props.timeout === "infinite") return -1;
    return props.timeout;
  }

  // No action => timeout depending on type
  if (props.type === "error") return 5000;

  return 3000;
});

/**
 * Emits events on a model value change.
 *
 * @param {boolean} value the new model value
 */
function onModelValueChange(value: boolean): void {
  // Emit mode value change
  model.value = value;
  if (!value) emit("closed");
}
</script>
