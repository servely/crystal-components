<template>
  <div class="c-secondary-navigation">
    <v-navigation-drawer
      v-if="showDrawer"
      :color="sideNavigationColor"
      :order="navigationDrawerOrder"
      :class="navigationDrawerClass"
      elevation="0"
      class="border-none"
    >
      <v-list color="primary" bg-color="transparent" variant="text">
        <slot name="list-items"></slot>
      </v-list>
    </v-navigation-drawer>

    <v-scale-transition v-if="slots['tab-items']">
      <v-app-bar
        v-if="showTabs"
        :color="tabNavigationColor"
        :order="appBarOrder"
        height="48"
      >
        <c-primary-tabs :align-tabs="alignTabs">
          <slot name="tab-items"></slot>
        </c-primary-tabs>
      </v-app-bar>
    </v-scale-transition>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useDisplay } from "vuetify";
import CPrimaryTabs from "./CPrimaryTabs.vue";

/**
 * This component builds a secondary navigation that can be used to navigate inside a page.
 *
 * The navigation consists out of two different types of navigation:
 * A side navigation inside a `v-navigation-drawer` and a primary tab-navigation inside a `v-app-bar`.
 *
 *
 * Side Navigation (v-list in v-navigation-drawer)
 * Shown above vuetify md-breakpoint.
 * Requires `v-list-item`s in the `list-items` slot.
 * Also supports `c-navigation-subtitle`s.
 *
 * Tab Navigation (c-primary-tabs in v-app-bar)
 * Shown below vuetify md-breakpoint.
 * Requires `v-tab`s in the `tab-items` slot.
 */
const props = withDefaults(
  defineProps<{
    /**
     * Controls which navigation type is displayed.
     *
     * - `"hybrid"` (default): drawer on larger screens, tabs on smaller screens (md and below).
     * - `"drawer"`: always show the side navigation drawer.
     * - `"tabs"`: always show the tab navigation bar.
     */
    mode?: "hybrid" | "drawer" | "tabs";

    /**
     * Where the tabs should be aligned inside `CPrimaryTabs`.
     */
    alignTabs?: "start" | "title" | "center" | "end";

    /**
     * Adjust the order of the navigation-drawer in which the side navigation is placed
     * in relation to its registration order.
     */
    navigationDrawerOrder?: string | number;

    /**
     * The color of the side navigation.
     */
    sideNavigationColor?: string;

    /**
     * Optional CSS-classes to set for the navigation-drawer.
     */
    navigationDrawerClass?: string;

    /**
     * Adjust the order of the app-bar in which the tab navigation is placed
     * in relation to its registration order.
     */
    appBarOrder?: string | number;

    /**
     * The color of the tab navigation.
     */
    tabNavigationColor?: string;
  }>(),
  {
    mode: "hybrid",
    alignTabs: "start",
    navigationDrawerOrder: 1,
    sideNavigationColor: "background",
    navigationDrawerClass: undefined,
    appBarOrder: 1,
    tabNavigationColor: "background",
  },
);

const slots = useSlots();
const { mdAndDown } = useDisplay();

const showDrawer = computed(() => {
  if (!slots["list-items"]) return false;
  return props.mode === "hybrid" || props.mode === "drawer";
});

const showTabs = computed(() => {
  if (props.mode === "drawer") return false;
  if (props.mode === "tabs") return true;
  // hybrid: only on md and below
  return mdAndDown.value;
});
</script>

<style lang="scss">
.c-secondary-navigation {
  .v-list-item {
    border-radius: 8px 24px 24px 8px !important;

    .v-list-item__prepend .v-list-item__spacer {
      width: 16px !important;
    }
  }
}
</style>
