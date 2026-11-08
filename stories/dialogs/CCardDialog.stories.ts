import { Meta, StoryObj } from "@storybook/vue3-vite";
import { userEvent, within } from "storybook/test";
import isChromatic from "chromatic/isChromatic";
import { CCardDialog } from "../../src";
import {
  createComponentStorybookParameters,
  createStorybookParameters,
  createStorybookRender,
} from "../../src/storybook-helper";

const meta: Meta<typeof CCardDialog> = {
  title: "Components/Dialogs/CardDialog",
  component: CCardDialog,
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
    width: {
      control: "text",
    },
    minWidth: {
      control: "text",
    },
    persistent: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    closeButton: {
      control: "boolean",
    },
    fullscreen: {
      control: "boolean",
    },
  },
  args: {
    modelValue: false,
  },
  parameters: createComponentStorybookParameters({
    componentDescription:
      "This component is a wrapper for the vuetify dialog with a card following the material design 3 specifications. \n\n *Due to storybook restrictions all non-default stories do not work on this docs page, but they do on their respective story pages.*",
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
export const Default: Story = {
  args: {
    title: "Dialog title",
    subtitle: "Dialog subtitle",
  },
  render: createStorybookRender({
    components: { CCardDialog },
    template: `
      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
        <c-card-dialog v-bind='args' @update:modelValue='(val) => updateModel(val)'>
          The content of the dialog.
          
          <template #prepend-actions>
            <v-btn>Learn more</v-btn>
          </template>
          
          <template #actions>
            <v-btn>Cancel</v-btn>
            <v-btn>Okay</v-btn>
          </template>
        </c-card-dialog>
      </div>
        `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      The content of the dialog.
      
      <template #prepend-actions>
        <v-btn>Learn more</v-btn>
      </template>
      
      <template #actions>
        <v-btn>Cancel</v-btn>
        <v-btn>Okay</v-btn>
      </template>
    `,
  }),
};

export const Persistent: Story = {
  args: {
    title: "Persistent Dialog",
    subtitle:
      "This dialog can't be closed by clicking outside or escape, just with buttons.",
    persistent: true,
  },
  render: createStorybookRender({
    components: { CCardDialog },
    template: `
      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
        <c-card-dialog v-bind='args' @update:modelValue='(val) => updateModel(val)'>
           <template #actions>
            <v-btn @click="updateModel(false);">Cancel</v-btn>
            <v-btn @click="updateModel(false);">Okay</v-btn>
          </template>
        </c-card-dialog>
      </div>
        `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      <template #actions>
        <v-btn>Cancel</v-btn>
        <v-btn>Okay</v-btn>
      </template>
    `,
  }),
};

export const SimpleConfirmDialog: Story = {
  args: {
    subtitle: "Are you sure you want to delete your account?",
    width: "350px",
  },
  render: createStorybookRender({
    components: { CCardDialog },
    template: `
      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
        <c-card-dialog v-bind='args' @update:modelValue='(val) => updateModel(val)'>
          <template #actions>
            <v-btn @click="updateModel(false);">Cancel</v-btn>
            <v-btn @click="updateModel(false);" color="red" variant="tonal">Delete</v-btn>
          </template>
        </c-card-dialog>
      </div>
        `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      <template #actions>
        <v-btn>Cancel</v-btn>
        <v-btn color="red" variant="tonal">Delete</v-btn>
      </template>
    `,
  }),
};

export const Loading: Story = {
  args: {
    title: "Loading Dialog",
    loading: true,
  },
  render: createStorybookRender({
    components: { CCardDialog },
    template: `
      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
        <c-card-dialog v-bind='args' @update:modelValue='(val) => updateModel(val)'>
           <template #actions>
            <v-btn @click="updateModel(false);">Cancel</v-btn>
            <v-btn @click="updateModel(false);">Okay</v-btn>
          </template>
        </c-card-dialog>
      </div>
        `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      <template #actions>
        <v-btn>Cancel</v-btn>
        <v-btn>Okay</v-btn>
      </template>
    `,
  }),
};

export const Width: Story = {
  args: {
    title: "Dialog with defined widths",
    subtitle: "This Dialog has a min-width of 300px and a max-width of 500px.",
    width: "500px",
    minWidth: "300px",
  },
  render: createStorybookRender({
    components: { CCardDialog },
    template: `
      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
        <c-card-dialog v-bind='args' @update:modelValue='(val) => updateModel(val)'>
           <template #actions>
            <v-btn @click="updateModel(false);">Cancel</v-btn>
            <v-btn @click="updateModel(false);">Okay</v-btn>
          </template>
        </c-card-dialog>
      </div>
        `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      <template #actions>
        <v-btn>Cancel</v-btn>
        <v-btn>Okay</v-btn>
      </template>
    `,
  }),
};

export const ScrollableContent: Story = {
  args: {
    title: "Scrollable Content Dialog",
    subtitle:
      "The content inside this dialog is scrollable. The title and the actions however will always stay visible. The dividers between the content and the title and actions will only be built when the dialog opens and will not adjust, if the window is resized.",
  },
  render: createStorybookRender({
    components: { CCardDialog },
    template: `
      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
        <c-card-dialog v-bind='args' @update:modelValue='(val) => updateModel(val)'>
           <v-sheet class="bg-primary text-center pa-5" rounded="xl" height="500px">
              Large Content
           </v-sheet>
        
           <template #actions>
            <v-btn @click="updateModel(false);">Cancel</v-btn>
            <v-btn @click="updateModel(false);">Okay</v-btn>
          </template>
        </c-card-dialog>
      </div>
        `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      <v-sheet class="bg-primary text-center pa-5" rounded="xl" height="500px">
        Large Content
      </v-sheet>

      <template #actions>
        <v-btn>Cancel</v-btn>
        <v-btn>Okay</v-btn>
      </template>
    `,
  }),
};

export const CloseButton: Story = {
  args: {
    title: "Dialog with a close button",
    closeButton: true,
  },
  render: createStorybookRender({
    components: { CCardDialog },
    template: `
      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
        <c-card-dialog v-bind='args' @update:modelValue='(val) => updateModel(val)'>
          The content of the dialog.
          
          <template #actions>
            <v-btn>Okay</v-btn>
          </template>
        </c-card-dialog>
      </div>
        `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      The content of the dialog.
      
      <template #actions>
        <v-btn>Okay</v-btn>
      </template>
    `,
  }),
};

export const Fullscreen: Story = {
  args: {
    title: "Fullscreen dialog",
    closeButton: true,
    fullscreen: true,
  },
  render: createStorybookRender({
    components: { CCardDialog },
    template: `
      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
        <c-card-dialog v-bind='args' @update:modelValue='(val) => updateModel(val)'>
          The content of the dialog.
          
          <template #actions>
            <v-btn>Okay</v-btn>
          </template>
        </c-card-dialog>
      </div>
        `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      The content of the dialog.
      
      <template #actions>
        <v-btn>Okay</v-btn>
      </template>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    title: "Disabled Dialog with actions",
    closeButton: true,
    disabled: true,
  },
  render: createStorybookRender({
    components: { CCardDialog },
    template: `
      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" @click='updateModel(true)' v-show="!chromatic">Show Dialog</v-btn>
        <c-card-dialog v-bind='args' @update:modelValue='(val) => updateModel(val)'>
          The content of the dialog.

          <template #actions>
            <v-btn>Okay</v-btn>
          </template>
        </c-card-dialog>
      </div>
    `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      The content of the dialog.

      <template #actions>
        <v-btn>Okay</v-btn>
      </template>
    `,
  }),
};
