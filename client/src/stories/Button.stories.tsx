import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { fn } from "storybook/test";
import Button from "../components/ui/Button";

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
  component: Button,
  args: {
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Test",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Test",
  },
  render: (args) => {
    return <Button {...args} />;
  },
};

export const Loading: Story = {
  args: {
    children: "Save",
    isLoading: true,
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    children: "Save",
    disabled: true,
    onClick: fn(),
  },
};
