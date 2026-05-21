# Lynx Starter (Vue 3)

Vue 3 starter for **Lynx** native targets: Tailwind-based UI, router, optional Pinia and i18n, Vitest, and Android build helpers.

**Repository:** [github.com/davidaganov/vue-lynx-template](https://github.com/davidaganov/vue-lynx-template)
**Catalog starters:** [github.com/davidaganov/stack](https://aganov.dev/en/docs/guides/starters)

## Recommended setup

Use **[@davidaganov/stack](https://www.npmjs.com/package/@davidaganov/stack)**:

```bash
npx @davidaganov/stack
```

Choose **Vue Lynx Template**, then:

| Mode            | What you get                                                                                    |
| :-------------- | :---------------------------------------------------------------------------------------------- |
| **Empty**       | Core from `.webstack/template-empty` only.                                                      |
| **Recommended** | Demo pages plus **Pinia**, **i18n**, **tests**, and **platforms** integration.                  |
| **Custom**      | Demo pages baseline; you independently toggle **Pinia**, **i18n**, and **Unit tests (Vitest)**. |

---

## Manual setup

1. `git clone https://github.com/davidaganov/vue-lynx-template.git`
2. `cd vue-lynx-template`
3. `npm install`
4. `npm run dev`
5. Preview on device with Lynx Explorer (same Wi‑Fi as the dev machine).

---

## Prerequisites

- **Node.js** v18+
- **JDK 17** and **Android Studio** / SDK for `npm run build:android`

---

## Internationalization

Locale JSON under `src/i18n/locales/`. Typical usage:

```typescript
import { useI18n } from "@/composables/useI18n"

const { t } = useI18n()
t("home.hero.title")
```

`npm run translate` runs [Polyglot Keeper](https://aganov.dev/en/docs/about/projects/polyglot-keeper) sync when the **i18n** layer is present.

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

MIT © [David Aganov](https://aganov.dev/en)
