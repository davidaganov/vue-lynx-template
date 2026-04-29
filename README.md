# Lynx Starter (Vue 3)

A template for building native applications using Vue 3 with Lynx.

## Key Features

- **Tailwind CSS 3**: Pre-configured with `@lynx-js/tailwind-preset` for utility-first native styling.
- **Routing**: Ready-to-use `vue-router` setup for multi-page application logic.
- **State Management**: Integrated **Pinia** for scalable reactive state.
- **i18n**: Custom lightweight localization system with AI-powered translation sync.
- **Automated Pipeline**: Smart scripts for Android builds and icon generation.

## Prerequisites

- **Node.js** (v18 or higher)
- **JDK 17** (required for Android builds)
- **Android Studio** (for SDK management)

## Quick Start

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start development server**:
    ```bash
    npm run dev
    ```
3.  **Preview on device**:
    - Install **Lynx Explorer** on Android ([Releases](https://github.com/lynx-family/lynx/releases)).
    - Ensure the device is on the same Wi-Fi network.
    - Scan the QR code generated in the terminal.

## Internationalization (i18n)

This project features a custom, lightweight i18n implementation designed for Lynx.

- The primary locale is `src/i18n/locales/en.json`.
- To synchronize other locales using AI, we use the [Polyglot Keeper](https://github.com/davidaganov/polyglot-keeper):
  ```bash
  npm run translate
  ```

## Android Build Pipeline

The build process is automated via a custom script that handles platform initialization, asset syncing, and resource preparation.

### Build APK

```bash
npm run build:android
```

The script performs the following:

1.  Initializes `android/` and `web/` platforms if missing.
2.  Compiles Lynx/Vue bundles.
3.  Syncs assets to native projects.
4.  Generates launcher icons from `public/favicon.png`.
5.  Compiles the APK via Gradle.

**Output:** `android/app/build/outputs/apk/debug/app-debug.apk`

### SDK Configuration (Windows)

If the SDK is not found, set the `ANDROID_HOME` environment variable:

1.  Add `ANDROID_HOME` variable pointing to your SDK path.
2.  Add `%ANDROID_HOME%\platform-tools` to your system `Path`.
3.  Restart the terminal.

## Project Structure

- `src/` — Vue 3 source code.
- `public/` — Static assets (source for icon generation).
- `scripts/` — Build and automation scripts.
- `android/` — Native Android wrapper.
- `web/` — Web platform wrapper.

## License

MIT © [David Aganov](https://github.com/davidaganov)
