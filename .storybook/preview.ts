import customTheme from "./customTheme";

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
    docs: {
      story: { inline: false, iframeHeight: 400 },
    },
  },
  docs: {
    theme: customTheme,
  },
};

export default preview;
