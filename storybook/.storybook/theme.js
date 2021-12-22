import { themes, create } from '@storybook/theming';
import darkImage from '../src/assets/cosmic-logo-dark.png';
import lightImage from '../src/assets/cosmic-logo-normal.png';

const config = {
  brandTitle: 'Cosmic Design Components',
  brandUrl: 'https://github.com/design-to-release/cosmic',
};

export default mode => {
  return {
    ...themes[mode],
    ...config,
    brandImage: mode == 'dark' ? darkImage : lightImage,
    // brandImage: `https://raw.githubusercontent.com/design-to-release/cosmic/main/scripts/stories/assets/cosmic-logo-${mode}.png`
  };
};
