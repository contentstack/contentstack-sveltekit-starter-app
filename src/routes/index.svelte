<script lang="ts">
  import RenderComponent from '../components/renderComponent.svelte';
  import { getPageRes } from '../helper/index';
  import type { Page } from 'src/model/page.model';
  import { onMount } from 'svelte';
  import { onEntryChange } from '../sdk/index';

  let entry: Page;
  const fetchData = async () => {
    let entryRes = await getPageRes('/');
    entry = entryRes;
  };
  onMount(() => {
    fetchData();
    onEntryChange(fetchData);
  });
</script>

<RenderComponent pageComponents={entry} blogPost={null} />
