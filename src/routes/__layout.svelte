<script lang="ts">
  import DevTools from '../components/dev-tools.svelte';
  import Footer from '../components/footer.svelte';
  import Header from '../components/header.svelte';
  import '../styles/app.css';
  import '../styles/json-preview.css';
  import '../styles/third-party.css';
  import '../styles/tool-tip.css';
  import '@contentstack/live-preview-utils/dist/main.css';
</script>

<Header />
<DevTools />
<main>
  <slot />
</main>
<Footer />
