import { themes, create } from '@storybook/theming';
import darkImage from '../scripts/stories/assets/cosmic-logo-dark.png';
import lightImage from '../scripts/stories/assets/cosmic-logo-normal.png';


const config = {
  brandTitle: 'Cosmic Design Components',
  brandUrl: 'https://github.com/design-to-release/cosmic'
};
export default (mode) => {
    return {
        ...themes[mode],
        ...config,
        brandImage: mode == 'dark' ? darkImage.src : lightImage.src,
        // brandImage: `https://raw.githubusercontent.com/design-to-release/cosmic/main/scripts/stories/assets/cosmic-logo-${mode}.png`
    }
};
