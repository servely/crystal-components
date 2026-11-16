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
    <c-snackbar
      v-if="activeSnackbar"
      v-model="activeSnackbar.model"
      :type="activeSnackbar.type"
      :position="activeSnackbar.position"
      :z-index="zIndex"
      @closed="showNextSnackbar"
    >
      {{ activeSnackbar.message }}
    </c-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CSnackbar, {
  type CSnackbarLocation,
  type CSnackbarType,
} from "./CSnackbar.vue";

/**
 * Data of a snackbar to display.
 */
export type SnackbarData = {
  /**
   * The message to display inside the snackbar.
   */
  message: string;

  /**
   * The {@link CSnackbarType}.
   */
  type?: CSnackbarType;

  /**
   * The {@link CSnackbarLocation}.
   */
  position?: CSnackbarLocation;
};

/**
 * This component manages multiple {@link CSnackbar}s to display them after each other.
 *
 * Use the exposed function {@link addSnackbar} to add a new {@link CSnackbar} to the queue.
 *
 * To access the exposed function, use the SnackbarManager with a reference in the template: `<c-snackbar-manager ref="snackbarManager"></c-snackbar-manager>`
 * and create the reference variable `const snackbarManager = ref<InstanceType<typeof CSnackbarManager> | null>(null);`.
 * A {@link CSnackbar} can then be added like `snackbarManager.value.addSnackbar(...)`.
 */
const props = defineProps<{
  /**
   * Whether newly added snackbars should successively be shown as soon as the currently active snackbar is closed or not.
   */
  successively?: boolean;

  /**
   * The z-index used for the component.
   */
  zIndex?: string | number;
}>();

/**
 * Currently active snackbar.
 */
const activeSnackbar = ref<({ model: boolean } & SnackbarData) | null>(null);

/**
 * List of further available snackbars.
 */
let availableSnackbars: SnackbarData[] = [];

/**
 * Adds a new snackbar to show in this manager.
 *
 * If they should be shown successively, it will be queued.
 * Otherwise, it will immediately replace a current active snackbar.
 *
 * @param {SnackbarData} snackbar the snackbar to add
 */
const addSnackbar = (snackbar: SnackbarData): void => {
  // Check, if we should instantly show this new snackbar
  if (props.successively) {
    // Add this snackbar to the availableSnackbars
    availableSnackbars.push(snackbar);
  } else {
    // Set the new snackbar as the only snackbar to show
    availableSnackbars = [snackbar];
  }

  // Show the snackbar, if no snackbar is currently active, or they shouldn't be successively
  if (!props.successively || !activeSnackbar.value) showNextSnackbar();
};

defineExpose({
  addSnackbar,
});

/**
 * Hides currently {@link activeSnackbar} and shows the next available snackbar.
 */
function showNextSnackbar(): void {
  const showNext = () => {
    // Get next snackbar
    const nextSnackbar = availableSnackbars.shift();
    if (nextSnackbar) {
      activeSnackbar.value = Object.assign(nextSnackbar, { model: true });
    } // No more snackbars available
  };

  // Fade out currently active snackbar, if available
  const lastActiveSnackbar = activeSnackbar.value;

  if (lastActiveSnackbar) {
    lastActiveSnackbar.model = false;
    setTimeout(showNext, 200);
  } else showNext();
}
</script>
