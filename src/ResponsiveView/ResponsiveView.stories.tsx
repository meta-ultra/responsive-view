import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ResponsiveView } from "./ResponsiveView";

const meta = {
  title: "ResponsiveView",
  component: ResponsiveView,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ResponsiveView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = () => (
  <div
    style={{
      position: "absolute",
      background: "green",
      width: 500,
      height: 500,
    }}
  >
    <ResponsiveView
      minScale={0.2}
      style={{
        width: 200,
        height: 100,
        background: "red",
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      coinsoding
    </ResponsiveView>
    <div style={{ background: "blue" }}>hhh</div>
  </div>
);
