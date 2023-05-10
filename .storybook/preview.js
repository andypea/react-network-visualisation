import customTheme from "./customTheme.js";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ["Introduction", "Changelog"],
      },
    },
  },
  docs: {
    theme: customTheme,
  },
};

export default preview;
