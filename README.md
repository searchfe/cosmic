# Cosmic Design

[![Build Status](https://api.travis-ci.com/design-to-release/cosmic.svg?branch=main)](https://travis-ci.com/design-to-release/cosmic)
[![GitHub issues by-label](https://img.shields.io/github/issues/design-to-release/cosmic/help%20wanted?label=issues%20need%20help&logo=github)](https://github.com/design-to-release/cosmic/issues?q=label%3A%22help+wanted%22+is%3Aopen+is%3Aissue)
[![Minimal node version](https://img.shields.io/static/v1?label=node&message=%3E=14.16&logo=node.js&color)](https://nodejs.org/about/releases/)
[![Minimal npm version](https://img.shields.io/static/v1?label=npm&message=%3E=7.7&logo=npm&color)](https://github.com/npm/cli/releases)

> 🚧 ing...

## The Repository

Cosmic design is a concrete practice of [D2R](https://design-to-release.github.io/docs).
This repository is where we develop it together with the community. Not only do we work on code and issues here, we also publish our roadmap , development guide. This source code is available to everyone under the standard [MIT license](LICENSE.txt).

## About Cosmic Design

> 🚧 ing...

## How it works
The template required a minimum [dependencies](package.json). Only **Vite** is used for building, nothing more.

### Project Structure

The structure of this template is very similar to the structure of a monorepo.

The entire source code of the program is divided into three modules (packages) that are bundled each independently:
- [`src/core`](src/core)
Include common dependencies, such as components, utils, ipc.
- [`src/app`](src/app)
Electron [**main script**](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file).
- [`src/workbench`](src/workbench)
Electron [**web page**](https://www.electronjs.org/docs/tutorial/quick-start#create-a-web-page).

### Cosmic Components

- [Components StoryBook](https://design-to-release.github.io/cosmic/components)
- [`src/core/components`](src/core/components)

### Build web resources

Packages `workbench` is built in [library mode](https://vitejs.dev/guide/build.html#library-mode) as it is a simple javascript.
`renderer` package build as regular web app.

The build of web resources is performed in the [`scripts/build.js`](scripts/build.js). Its analogue is a sequential call to `pnpm run build` for each package.

### Compile App
Next step is run  packaging and compilation a ready for distribution Electron app for macOS, Windows and Linux with "auto update" support out of the box. 

To do this, using the [electron-builder]:
- In npm script `compile`: This script is configured to compile the application as quickly as possible. It is not ready for distribution, is compiled only for the current platform and is used for debugging.
- In GitHub Action: The application is compiled for any platform and ready-to-distribute files are automatically added to the draft GitHub release. 


### Modes and Environment Variables
All environment variables set as part of the `import.meta`, so you can access them as follows: `import.meta.env`. 

You can also build type definitions of your variables by running `scripts/buildEnvTypes.js`. This command will create `types/env.d.ts` file with describing all environment variables for all modes.

The mode option is used to specify the value of `import.meta.env.MODE` and the corresponding environment variables files that needs to be loaded.

By default, there are two modes:
  - `production` is used by default
  - `development` is used by `npm run watch` script
  - `test` is used by `npm test` script

When running building, environment variables are loaded from the following files in your project root:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified env mode
.env.[mode].local   # only loaded in specified env mode, ignored by git
```

**Note:** only variables prefixed with `VITE_` are exposed to your code (e.g. `VITE_SOME_KEY=123`) and `SOME_KEY=123` will not.  you can access `VITE_SOME_KEY` using `import.meta.env.VITE_SOME_KEY`. This is because the `.env` files may be used by some users for server-side or build scripts and may contain sensitive information that should not be exposed in code shipped to browsers.



## Contribution

See Wiki **[Contributing](https://github.com/design-to-release/cosmic/wiki/Contributing)**

* [Source Code Organization](https://github.com/design-to-release/cosmic/wiki/Source-Code-Organization)
* User Interface
  * [Color Set](https://github.com/design-to-release/cosmic/wiki/Color-Set)

[electron]: https://github.com/electron/electron
[electron-builder]: https://github.com/electron-userland/electron-builder
[svelte]: https://github.com/sveltejs/svelte
[typescript]: https://github.com/microsoft/TypeScript/
[spectron]: https://github.com/electron-userland/spectron
[smelte]: https://github.com/matyunya/smelte
[tailwindcss]: https://github.com/tailwindlabs/tailwindcss