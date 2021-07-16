# Cosmic Design

[![Build Status](https://github.com/design-to-release/cosmic/workflows/ci/badge.svg?branch=main)](https://github.com/design-to-release/cosmic/actions)
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

### Compile App
Next step is run  packaging and compilation a ready for distribution Electron app for macOS, Windows and Linux with "auto update" support out of the box. 

To do this, using the [electron-builder]:
- In npm script `compile`: This script is configured to compile the application as quickly as possible. It is not ready for distribution, is compiled only for the current platform and is used for debugging.
- In GitHub Action: The application is compiled for any platform and ready-to-distribute files are automatically added to the draft GitHub release. 

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