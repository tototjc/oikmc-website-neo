export default {
  '**/*.{ts,astro}': ['astro check', 'eslint'],
  '**/*.{ts,js,mjs,cjs,vue}': ['eslint'],
  // '**/*.{ts,vue}': [() => 'tsc --noEmit'],
  '**/*.css': ['prettier --write'],
  '**/*.{json,md,mdx}': ['prettier --write'],
}
