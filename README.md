# Vue Lynx Template

**[Repository](https://github.com/davidaganov/vue-lynx-template)** | **[Docs](https://aganov.dev/en/docs/guides/templates/vue-lynx-template)**

Vue 3 + Lynx template source for [@davidaganov/stack](https://www.npmjs.com/package/@davidaganov/stack): Tailwind-based UI, router, and optional Pinia, i18n, and Vitest.

This repository is **generator source**, not a runnable app. Use the stack CLI to produce a project.

## Generate a project

```bash
npx @davidaganov/stack
```

Pick **Vue Lynx Template**, then:

| Mode            | Description                                                                       |
| :-------------- | :-------------------------------------------------------------------------------- |
| **Empty**       | Minimal app from `template-empty/`                                                |
| **Recommended** | Demo pages plus default optional modules                                          |
| **Custom**      | Demo pages; enable **Tailwind CSS**, **Pinia**, **i18n**, **Tests** independently |

Optional modules: **Tailwind CSS**, **Pinia**, **i18n**, **Tests**.

## Layout

| Path                   | Purpose                 |
| :--------------------- | :---------------------- |
| `template-empty/`      | Bare Lynx + Vue project |
| `features/demo-pages/` | Demo routes and UI      |
| `features/<name>/`     | Optional modules        |

Requirements: Node.js **>= 18**

## License

MIT © [David Aganov](https://aganov.dev/en)
