// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Když je nastavená proměnná BASE_PATH, stavíme náhled do podsložky
// (GitHub Pages). Bez ní se staví ostrá verze do kořene domény.
// Nastavuje se ve workflow .github/workflows/nahled.yml, ručně se s tím nesahá.
const podslozka = process.env.BASE_PATH;

export default defineConfig({
  // Kanonická adresa ostrého webu. Zůstává stejná i pro náhled — díky tomu
  // Google náhledovou verzi neindexuje jako duplicitní obsah.
  site: 'https://kosmetika-lima.cz',

  base: podslozka || undefined,

  // Adresy budou končit lomítkem (/osetreni/) — stejně jako u starého WordPressu.
  trailingSlash: 'always',

  build: {
    // Vytvoří /osetreni/index.html místo /osetreni.html.
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  integrations: [
    sitemap({
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
});
