import { Meta, StoryObj } from "@storybook/vue3-vite";
import { userEvent, within } from "storybook/test";
import isChromatic from "chromatic/isChromatic";
import { CConfirmDialog } from "../../src";
import {
  createComponentStorybookParameters,
  createStorybookParameters,
  createStorybookRender,
} from "../../src/storybook-helper";

const meta: Meta<typeof CConfirmDialog> = {
  title: "Components/Dialogs/ConfirmDialog",
  component: CConfirmDialog,
  argTypes: {
    modelValue: {
      control: "boolean",
    },
    title: {
      control: "text",
    },
    subtitle: {
      control: "text",
    },
    type: {
      control: "text",
    },
    confirmButtonLabel: {
      control: "text",
    },
    confirmButtonColor: {
      control: "text",
    },
    confirmButtonVariant: {
      control: "boolean",
    },
  },
  args: {
    modelValue: false,
  },
  parameters: {
    ...createComponentStorybookParameters({
      componentDescription:
        "This component builds a simple confirm dialog including a cancel and confirm button. \n\n *Due to storybook restrictions all non-default stories do not work on this docs page, but they do on their respective story pages.*",
    }),
    ...createStorybookParameters({
      slotTemplate: `
      <template #activator="{ props }">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
      </template>
    `,
    }),
  },
  play: async ({ canvasElement }) => {
    if (!isChromatic()) return;

    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { hidden: true });
    await userEvent.click(button);
  },
  render: createStorybookRender({
    components: { CConfirmDialog },
    template: `
      <div class="d-flex justify-center align-center">
        <c-confirm-dialog v-bind='args' @update:modelValue='(val) => updateModel(val)' @confirm="(close) => close()">
          <template #activator="{ props }">
            <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
          </template>
        </c-confirm-dialog>
      </div>
        `,
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    title: "Confirm action?",
    subtitle:
      "Are you sure you want to confirm this action? This cannot be undone.",
  },
};

export const ConfirmDeletion: Story = {
  args: {
    title: "Delete XYZ?",
    type: "delete",
  },
};

export const CustomConfirmButton: Story = {
  args: {
    title: "Custom confirmation",
    type: "delete",
    confirmButtonLabel: "Custom Confirm",
    confirmButtonColor: "green",
  },
};
