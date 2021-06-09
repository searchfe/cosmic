import { themes, create } from '@storybook/theming';

const config = {
  brandTitle: 'Cosmic Design Components Storybook',
  brandUrl: 'https://github.com/design-to-release/cosmic',
  brandImage: 'https://place-hold.it/350x150',
};
export default (mode) => {
    return {
        ...themes[mode],
        ...config,
        brandImage: `https://raw.githubusercontent.com/design-to-release/cosmic/main/scripts/stories/assets/cosmic-logo-${mode}.png`
    }
};
