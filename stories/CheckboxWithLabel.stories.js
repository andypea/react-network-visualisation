// stories/CheckboxWithLabel.stories.js

import { CheckboxWithLabel } from "../src/CheckboxWithLabel.jsx";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Example/CheckboxWithLabel",
  component: CheckboxWithLabel,
  tags: ["autodocs"],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic = {
  args: {
    labelOn: "On",
    labelOff: "Off",
  },
};

export const Judgemental = {
  args: {
    labelOn: "Good",
    labelOff: "Bad",
  },
};
