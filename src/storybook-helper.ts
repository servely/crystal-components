import type { Parameters, StoryContext, VueRenderer } from "@storybook/vue3";
import type { ArgsStoryFn } from "storybook/internal/types";
import { useArgs } from "storybook/preview-api";
import { Component } from "vue";
import isChromatic from "chromatic/isChromatic";

/**
 * Creates the storybook `parameter` object for the component itself.
 */
export function createComponentStorybookParameters(options?: {
  /**
   * A description of the component.
   */
  componentDescription: string;
}) {
  return {
    docs: {
      description: {
        component: options?.componentDescription,
      },
    },
  };
}

/**
 * Creates the storybook `parameter` object for a story with a custom code-documentation.
 */
export function createStorybookParameters(options?: {
  /**
   * Template to use in the slot of this component.
   */
  slotTemplate?: string;
}): Parameters {
  const slotTemplate = options?.slotTemplate ?? "";

  return {
    docs: {
      source: {
        transform: (_code: string, storyContext: StoryContext): string => {
          return `
<template>
  <${storyContext.component?.__name}${toPropString(storyContext.args)}>
      ${slotTemplate}
  </${storyContext.component?.__name}>
</template>
`;
        },
      },
    },
  };
}

/**
 * Creates the storybook `render` function with a custom template.
 */
export function createStorybookRender(options: {
  /**
   * Object of components to include in this render.
   */
  components: Record<string, Component>;

  /**
   * The template to build to display the component.
   *
   * If the component uses a `v-model`, you can implement it like that:
   * Use a button in the `template` to update the model with `updateModel`:
   * `<v-btn class="ma-4" @click="updateModel(true)" v-show="!chromatic">Click!</v-btn>`
   *
   * Use the model in your component by binding the args and calling `updateModel` on model-change:
   * `<component v-bind="args" @update:modelValue="(val) => updateModel(val)"></component>`
   *
   * Keep in mind to provide `modelValue: false` in the main components `args`.
   *
   * CAUTION: Keep in mind, that using models (and buttons) will only work for the main story in the "Docs" page.
   * This is due to storybook restrictions, where the sub-stories will not be re-rendered with updated args.
   * They do however work in their respective story pages.
   */
  template?: string;
}): ArgsStoryFn<VueRenderer, any> {
  return () => {
    const [args, updateArgs] = useArgs();

    return {
      components: options.components,
      setup() {
        const updateModel = (show: boolean) => {
          updateArgs({ modelValue: show });
        };

        const chromatic = isChromatic();

        return { args, updateModel, chromatic };
      },
      template: options.template,
    };
  };
}

/**
 * Returns a correctly formatted properties-string for use in the docs code.
 *
 * @param args the provided arguments.
 */
function toPropString(args: Record<string, any>): string {
  let propString = "\n    ";
  for (let key in args) {
    let value = args[key];

    // Replace model value with v-model in the documentation.
    if (key === "modelValue") {
      key = "v-model";
      value = "model";
    }

    const colon = typeof value !== "string";

    propString += (colon ? ":" : "") + key + '="' + value + '"\n    ';
  }
  return propString.slice(0, propString.length - 2);
}
