# Cosmic 

[![GitHub issues by-label](https://img.shields.io/github/issues/design-to-release/cosmic/help%20wanted?label=issues%20need%20help&logo=github)](https://github.com/design-to-release/cosmic/issues?q=label%3A%22help+wanted%22+is%3Aopen+is%3Aissue)
[![Required Node.JS >= v16.13](https://img.shields.io/static/v1?label=node&message=%3E=16.13&logo=node.js&color)](https://nodejs.org/about/releases/)
[![Required npm >= v8.1](https://img.shields.io/static/v1?label=npm&message=%3E=8.1&logo=npm&color)](https://github.com/npm/cli/releases)


Cosmic is the free and open source ui design suite. It supports the entirety of the prototype, visual design, animation, component package and code release.


## Get started

### Continuous Integration
- The configured workflow will check the types for each push and PR.
- The configured workflow will check the code style for each push and PR.
  - Unit tests are placed within each package and run separately.
  - End-to-end tests are placed in the root [`tests`](tests) directory and use [playwright].

### Continuous delivery
- Each time you push changes to the `main` branch, the [`release`](.github/workflows/release.yml) workflow starts, which creates a release draft.
  - The version is automatically set based on the current date in the format `yy.mm.dd-minutes`.
  - Notes are automatically generated and added to the release draft.
  - Code signing supported. See [`compile` job in the `release` workflow](.github/workflows/release.yml).
- **Auto-update is supported**. After the release is published, all client applications will download the new version and install updates silently.

### Project Structure

The structure of this template is very similar to the structure of a monorepo.

The entire source code of the program is divided into three modules (packages) that are each bundled independently:
- [`packages/app`](packages/app)
  Electron [**main script**](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file).
- [`packages/preload`](packages/preload)
  Used in `BrowserWindow.webPreferences.preload`. See [Checklist: Security Recommendations](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content).
- [`packages/site`](packages/site)
  Electron [**web page**](https://www.electronjs.org/docs/tutorial/quick-start#create-a-web-page).
- [`packages/core`](packages/core)
  Core libs for cosmic.
- [`packages/module`](packages/module)
  Modules for cosmic.

### Compile App
The next step is to package and compile a ready to distribute Electron app for macOS, Windows and Linux with "auto update" support out of the box.

To do this using the [electron-builder]:
- Using the npm script `compile`: This script is configured to compile the application as quickly as possible. It is not ready for distribution, it is compiled only for the current platform and is used for debugging.
- Using GitHub Actions: The application is compiled for any platform and ready-to-distribute files are automatically added as a draft to the GitHub releases page.

### Using external modules in renderer
According to [Electron's security guidelines](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content), Node.js integration is disabled for remote content. This means that **you cannot call any Node.js api in the `packages/site` directly**. This also means you can't import external modules during runtime in the renderer:
```js
// renderer.bundle.js
const {writeFile} = require('fs') // ReferenceError: require is not defined
writeFile()
```

To use external modules in Renderer you **must** describe the interface in the `packages/preload` where the Node.js api is allowed:
```ts
// packages/preload/src/index.ts
import type {BinaryLike} from 'crypto';
import {createHash} from 'crypto';

contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum(data: BinaryLike) {
    const hash = createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  },
});
```

The [`dts-cb`](https://github.com/cawa-93/dts-for-context-bridge) utility will automatically generate an interface for TS:
```ts
// packages/preload/exposedInMainWorld.d.ts 
interface Window {
    readonly nodeCrypto: { sha256sum(data: import("crypto").BinaryLike): string; };
}
```
And now, you can safely use the registered method:
```ts
// packages/site/src/App.vue
window.nodeCrypto.sha256sum('data')
```

[Read more about Security Considerations](https://www.electronjs.org/docs/tutorial/context-isolation#security-considerations).


### Modes and Environment Variables
All environment variables set as part of the `import.meta`, so you can access them as follows: `import.meta.env`.

If you are using TypeScript and want to get code completion you must add all the environment variables to the [`ImportMetaEnv` in `types/env.d.ts`](types/env.d.ts).

The mode option is used to specify the value of `import.meta.env.MODE` and the corresponding environment variables files that need to be loaded.

By default, there are two modes:
- `production` is used by default
- `development` is used by `npm run watch` script

When running the build script, the environment variables are loaded from the following files in your project root:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified env mode
.env.[mode].local   # only loaded in specified env mode, ignored by git
```

To prevent accidentally leaking env variables to the client, only variables prefixed with `VITE_` are exposed to your Vite-processed code. e.g. the following file:

```
DB_PASSWORD=foobar
VITE_SOME_KEY=123
```
Only `VITE_SOME_KEY` will be exposed as `import.meta.env.VITE_SOME_KEY` to your client source code, but `DB_PASSWORD` will not.


## Contribution

See [Contributing Guide](contributing.md).


[vite]: https://github.com/vitejs/vite/
[electron]: https://github.com/electron/electron
[electron-builder]: https://github.com/electron-userland/electron-builder
[vue]: https://github.com/vuejs/vue-next
[vue-router]: https://github.com/vuejs/vue-router-next/
[typescript]: https://github.com/microsoft/TypeScript/
[playwright]: https://playwright.dev
[vitest]: https://vitest.dev
[vue-tsc]: https://github.com/johnsoncodehk/vue-tsc
[eslint-plugin-vue]: https://github.com/vuejs/eslint-plugin-vue
[cawa-93-github]: https://github.com/cawa-93/
[cawa-93-sponsor]: https://www.patreon.com/Kozack/
