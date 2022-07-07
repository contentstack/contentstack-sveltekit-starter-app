<script lang="ts">
  import RenderComponent from '../components/renderComponent.svelte';
  import { getPageRes } from '../helper/index';
  import { page } from '$app/stores';
  import type { Page } from 'src/model/page.model';
  import { afterUpdate, onMount } from 'svelte';
  import { onEntryChange } from '../sdk';

  let entry: Page;
  let url: string = $page.url.pathname;
  const fetchData = async () => {
    let entryRes = await getPageRes(url);
    entry = entryRes;
  };
  onMount(() => {
    fetchData();
    onEntryChange(fetchData);
  });
  afterUpdate(() => {
    if (url !== window.location.pathname) {
      url = window.location.pathname;
      fetchData();
      onEntryChange(fetchData);
    }
  });
</script>

<RenderComponent pageComponents={entry} blogPost={null} />
