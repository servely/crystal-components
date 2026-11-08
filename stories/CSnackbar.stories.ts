import { Meta, StoryObj } from "@storybook/vue3-vite";
import { userEvent, within } from "storybook/test";
import isChromatic from "chromatic/isChromatic";
import { CSnackbar } from "../src";
import {
  createComponentStorybookParameters,
  createStorybookParameters,
  createStorybookRender,
} from "../src/storybook-helper";

const meta: Meta<typeof CSnackbar> = {
  title: "Components/Snackbar",
  component: CSnackbar,
  argTypes: {
    modelValue: {
      control: "boolean",
    },
    location: {
      control: "radio",
      options: ["bottom", "top"],
    },
    type: {
      control: "text",
    },
    timeout: {
      control: "number",
    },
    zIndex: {
      control: "number",
    },
  },
  args: {
    modelValue: false,
  },
  parameters: {
    ...createComponentStorybookParameters({
      componentDescription:
        'This component is a wrapper for the vuetify snackbar. \n\n *Due to storybook restrictions all non-default stories do not work on this docs page, but they do on their respective story pages.*"',
    }),
    ...createStorybookParameters({
      slotTemplate: "This is a snackbar.",
    }),
  },
  render: createStorybookRender({
    components: { CSnackbar },
    template: `
      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Snackbar</v-btn>
        <c-snackbar v-bind='args' @update:modelValue='(val) => updateModel(val)'>
          This is a snackbar.
        </c-snackbar>
      </div>
        `,
  }),
  play: async ({ canvasElement }) => {
    if (!isChromatic()) return;

    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { hidden: true });
    await userEvent.click(button);
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Success: Story = {
  args: {
    type: "success",
  },
};

export const Primary: Story = {
  args: {
    type: "primary",
  },
};

export const CustomColor: Story = {
  args: {
    type: "purple",
  },
};

export const LocationTop: Story = {
  args: {
    location: "top",
  },
};

export const NoTimeout: Story = {
  args: {
    timeout: -1,
  },
};
