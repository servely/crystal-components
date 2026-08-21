<template>
  <v-navigation-drawer
    v-model="showDrawer"
    :rail="rail"
    :class="rail ? 'rail' : ''"
    rail-width="80"
    mobile-breakpoint="md"
    class="c-navigation-drawer"
    :color="color"
    :floating="floating"
  >
    <div class="d-flex flex-column" style="height: 100%">
      <!-- Branding -->
      <slot name="branding"></slot>

      <div
        class="d-flex flex-column overflow-x-hidden overflow-y-auto"
        style="height: 100%"
      >
        <div class="c-navigation-drawer-items flex-grow-1">
          <!-- Navigation Items -->
          <slot></slot>
        </div>

        <!-- Footer -->
        <v-fade-transition>
          <div v-if="slots['footer'] && !rail" class="my-3 text-no-wrap">
            <slot name="footer"></slot>
          </div>
        </v-fade-transition>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, useSlots, watch } from "vue";
import { useDisplay } from "vuetify";

const slots = useSlots();
const { smAndDown } = useDisplay();

/**
 * This component builds a navigation drawer that supports rail mode on large devices.
 */
withDefaults(
  defineProps<{
    /**
     * The background color of the navigation drawer.
     *
     * Defaults to "background" for floating design.
     */
    color?: string;

    /**
     * Whether the navigation drawer should be rendered without a border.
     *
     * Defaults to true.
     */
    floating?: boolean;
  }>(),
  {
    color: "background",
    floating: true,
  },
);

/**
 * The model, whether the navigation drawer should be expanded or not.
 */
const drawer = defineModel<boolean>({ required: true });

/**
 * Watches the {@link drawer} to update {@link showDrawer} and {@link rail}.
 */
watch(drawer, () => {
  if (smAndDown.value) {
    showDrawer.value = drawer.value;
    rail.value = false;
  } else {
    showDrawer.value = true;
    rail.value = !drawer.value;
  }
});

/**
 * The model of the navigation drawer.
 */
const showDrawer = ref<boolean>(drawer.value);

/**
 * Watches the {@link showDrawer} to sync the value to this components model {@link drawer}.
 */
watch(showDrawer, () => {
  drawer.value = showDrawer.value;
});

/**
 * Whether the navigation drawer should be in rail mode or not.
 */
const rail = ref<boolean>(false);
</script>

<style lang="scss">
.c-navigation-drawer {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;

  // Hide scrollbar, but let it scroll
  .overflow-y-auto {
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Edge */
    }
  }

  .c-navigation-drawer-items {
    .v-list-item {
      border-radius: 24px;

      .v-list-item__prepend {
        margin-left: 12px;

        .v-list-item__spacer {
          width: 12px !important;
        }
      }
    }
  }

  // Navigation items
  // Enable transitions for a few properties that will be used to hide items in rail mode
  & * {
    transition:
      height 0.2s ease-in-out,
      margin-bottom 0.2s ease-in-out,
      margin-top 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
  }

  &.rail {
    // Hide list item label in rail mode
    .v-list-item .v-list-item__content {
      opacity: 0;
    }
  }
}
</style>
