// .storybook/manager.js

import { addons } from "@storybook/manager-api";
import customTheme from "./customTheme.js";

addons.setConfig({
  theme: customTheme,
});
