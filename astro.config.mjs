import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  base: process.env.PORTFOLIO_BASE_PATH || '/',
  devToolbar: { enabled: false },
});
