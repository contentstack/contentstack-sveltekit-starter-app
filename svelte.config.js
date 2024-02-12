import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) return;
    handler(warning);
  },
  kit: {
    adapter: adapter()
  }
};

export default config;
