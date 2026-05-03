# Lynx Starter (Vue 3)

Vue 3 starter for **Lynx** native targets: Tailwind-based UI, router, optional Pinia and i18n, Vitest, and Android build helpers.

**Repository:** [github.com/davidaganov/vue-lynx-template](https://github.com/davidaganov/vue-lynx-template)

## Recommended setup: WebStack CLI

Use **[`@davidaganov/stack`](https://www.npmjs.com/package/@davidaganov/stack)** ([CLI source](https://github.com/davidaganov/stack)):

```bash
npx @davidaganov/stack
```

Choose **Vue Lynx Template**, then:

| Mode            | What you get                                                                                                                                              |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Empty**       | Core from `.webstack/template-empty` only.                                                                                                                |
| **Recommended** | Demo pages plus **Pinia**, **i18n**, **tests**, and (when all Lynx-related modules are enabled) **platforms** integration used by the recommended preset. |
| **Custom**      | Demo pages baseline; you independently toggle **Pinia**, **i18n** (custom Lynx i18n layer + Polyglot Keeper sync), and **Unit tests (Vitest)**.           |

Router and the demo views/components slice ship with non-empty modes; they are not a separate optional toggle. Skipped modules leave static English (or neutral) strings where the wizard did not enable that layer.

After generation, use `npm run dev` and scan the QR code with **Lynx Explorer** on device ([releases](https://github.com/lynx-family/lynx/releases)). Android packaging flows (`npm run build:android`) assume JDK and Android SDK as below.

Maintainers: **[GUIDLINE.md](https://github.com/davidaganov/stack/blob/main/GUIDLINE.md)** in [davidaganov/stack](https://github.com/davidaganov/stack).

---

## Manual setup (clone this repository)

1. `npm install`
2. `npm run dev`
3. Preview on device with Lynx Explorer (same Wi‑Fi as the dev machine).

---

## Prerequisites

- **Node.js** v18+
- **JDK 17** and **Android Studio** / SDK for `npm run build:android`

---

## Internationalization

Custom lightweight i18n for Lynx; primary strings live under `src/i18n/locales/`. Sync with AI-assisted tooling:

```bash
npm run translate
```

Uses [Polyglot Keeper](https://github.com/davidaganov/polyglot-keeper) when configured in the generated project.

---

## Testing

Vitest + Vue Test Utils:

```bash
npm test
npx vitest run --coverage
```

---

## Android build

```bash
npm run build:android
```

Initializes `android/` and `web/` when missing, builds Lynx/Vue bundles, syncs assets, generates launcher icons from `public/favicon.png`, and produces `android/app/build/outputs/apk/debug/app-debug.apk`.

**Windows:** set `ANDROID_HOME` and add `%ANDROID_HOME%\platform-tools` to `Path` if the SDK is not detected.

---

## Layout

- `src/` — Application source.
- `public/` — Static assets (icon source).
- `scripts/` — Automation.
- `android/`, `web/` — Native/web wrappers (created or updated by build scripts).

---

## License

MIT © [David Aganov](https://github.com/davidaganov)
