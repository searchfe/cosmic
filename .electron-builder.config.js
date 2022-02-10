if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date;
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: 'design.cosmic.app',
  productName: 'Cosmic',
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  asar: false,
  files: [
    'packages/**/dist/**',
  ],
  // linux: {
  //   category: 'Graphics',
  //   target: [{
  //     target: 'deb',
  //     arch: ['x64', 'arm64'],
  //   }, {
  //     target: 'AppImage',
  //     arch: ['x64', 'arm64'],
  //   }, {
  //     target: 'rpm',
  //     arch: ['x64', 'arm64'],
  //   }, {
  //     target: 'snap',
  //     arch: ['x64'],
  //   }]
  // },
  // win: {
  //   target: ['nsis'],
  // },
  mac: {
    category: 'public.app-category.graphics-design',
    target: {
      target: 'dmg',
      arch: ['x64', 'arm64'],
    }
  },
  nsis: {
    // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
    oneClick: false,
    // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
    allowElevation: true,
    // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
    allowToChangeInstallationDirectory: true,
    // // 安装图标
    // installerIcon: 'src/assets/icon.ico',
    // // 卸载图标
    // uninstallerIcon: 'src/assets/icon.ico',
    // // 安装时头部图标
    // installerHeaderIcon: 'src/assets/icon.ico',
    // 创建桌面图标
    createDesktopShortcut: true,
    // 创建开始菜单图标
    createStartMenuShortcut: true
  },
  publish: {
    provider: 'github',
    owner: 'design-to-release',
    repo: 'cosmic'
  },
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
};

module.exports = config;
