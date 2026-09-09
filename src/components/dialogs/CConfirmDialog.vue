<template>
  <c-card-dialog
    v-model="model"
    :title="title"
    :subtitle="subtitle"
    :disabled="loading"
    :persistent="loading"
    :loading="loading"
    title-size="normal"
    wrap-title
  >
    <template v-if="slots['activator']" #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps"></slot>
    </template>

    <template #actions>
      <v-btn @click="model = false">
        {{ i18n.t("crystal_components.common.labels.cancel") }}
      </v-btn>
      <v-btn
        :color="computedConfirmButtonColor"
        :variant="confirmButtonVariant"
        @click="confirm"
      >
        {{ computedConfirmButtonLabel }}
      </v-btn>
    </template>
  </c-card-dialog>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import { useI18n } from "vue-i18n";
import CCardDialog from "./CCardDialog.vue";

const slots = useSlots();
const i18n = useI18n();

/**
 * The model, whether the dialog should be shown or not.
 */
const model = defineModel<boolean>({ default: false });

/**
 * This component builds a simple confirm dialog including a cancel and confirm button.
 */
const props = withDefaults(
  defineProps<{
    /**
     * The title of this confirm dialog.
     *
     * Usually the question "Delete XYZ?", "Move XYZ?", ...
     */
    title: string;

    /**
     * The subtitle of the dialog.
     */
    subtitle?: string;

    /**
     * The type of the confirm dialog defines the default label and color of the confirm button.
     *
     * Both default values can be overwritten with their respective properties `confirm-button-label` and `confirm-button-color`.
     */
    type?: "confirm" | "delete";

    /**
     * The label of the confirm button.
     */
    confirmButtonLabel?: string;

    /**
     * The color of the confirm button.
     */
    confirmButtonColor?: string;

    /**
     * The variant of the confirm button.
     */
    confirmButtonVariant?:
      | "tonal"
      | "flat"
      | "text"
      | "elevated"
      | "outlined"
      | "plain";
  }>(),
  {
    type: "confirm",
    subtitle: undefined,
    confirmButtonLabel: undefined,
    confirmButtonColor: undefined,
    confirmButtonVariant: "tonal",
  },
);

/**
 * Whether the dialog is currently loading.
 *
 * Disables the actions and displays a loading animation in the confirm button.
 */
const loading = ref<boolean>(false);

const emit = defineEmits<{
  /**
   * Event emitted when the user clicked the confirm button.
   *
   * This will also start the loading animation and disable the actions.
   *
   * Use `closeDialog` function to close the dialog and stop the loading animation.
   */
  (e: "confirm", closeDialog: () => void): void;
}>();

/**
 * The computed label of the confirm button.
 */
const computedConfirmButtonLabel = computed<string>(() => {
  if (props.confirmButtonLabel) return props.confirmButtonLabel;
  switch (props.type) {
    case "delete":
      return i18n.t("crystal_components.common.labels.delete");
    default:
      return i18n.t("crystal_components.common.labels.confirm");
  }
});

/**
 * The computed color of the confirm button.
 */
const computedConfirmButtonColor = computed<string>(() => {
  if (props.confirmButtonColor) return props.confirmButtonColor;
  switch (props.type) {
    case "delete":
      return "red";
    default:
      return "primary";
  }
});

/**
 * Confirms the action.
 *
 * Closes the dialog and emitting the `confirmed` event.
 */
function confirm(): void {
  loading.value = true;

  emit("confirm", () => {
    model.value = false;
    loading.value = false;
  });
}
</script>

<style scoped lang="scss"></style>
