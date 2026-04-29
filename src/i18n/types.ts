import type { locales } from "./index"

/**
 * Types for i18n.
 */
export type Locale = keyof typeof locales
export type Messages = (typeof locales)[Locale]

/**
 * Type-safe path helper – derives all dot-joined leaf key paths from a nested object type.
 * Example: LeafPaths<{ a: { b: string; c: string } }> → "a.b" | "a.c"
 */
type LeafPaths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? Prefix extends ""
      ? K
      : `${Prefix}.${K}`
    : T[K] extends Record<string, unknown>
      ? LeafPaths<T[K], Prefix extends "" ? K : `${Prefix}.${K}`>
      : never
}[keyof T & string]

export type TranslationKey = LeafPaths<Messages>

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $t: (key: TranslationKey, params?: Record<string, string | number>) => string
    // @ts-ignore
    $i18n: import("./plugin").I18nInstance
  }
}
