import '@storybook/addon-storysource/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-notes/register';
import '@storybook/addon-viewport/register';
// import '@storybook/addon-a11y/register';
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import 'storybook-dark-mode/register'

addons.setConfig({
  theme: themes.dark
});

