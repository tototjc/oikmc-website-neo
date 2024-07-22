/// <reference path="../.astro/types.d.ts" />
/// <reference types='astro/client' />
/// <reference types='vite-plugin-pwa/info' />
/// <reference types='vite-plugin-pwa/client' />
/// <reference types='vite-plugin-pwa/pwa-assets' />

interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals {
    session: import('@auth/core/types').Session | null
  }
}
