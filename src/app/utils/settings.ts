import ElectronStore from 'electron-store';

interface ISettings {
  check: boolean;
}

/**
 * @deprecated — Cause bundle error: Cannot find module 'ajv/dist/compile/codegen'
 */
const settings = new ElectronStore<ISettings>({
  defaults: {
    check: false,
  },
});

export default settings;
