<script lang="ts">
	import RenderComponent from '../components/renderComponent.svelte';
	import { getPageRes } from '../helper/index.d';
	import type { Page } from 'src/model/page.model';
	import { afterUpdate, onMount } from 'svelte';
	import { onEntryChange } from '../sdk/index.d';

	let Entry: Page;
	const fetchData = async () => {
		let entryRes = await getPageRes('/');
		Entry = entryRes;
	};
	onMount(() => {
		fetchData();
	});

	afterUpdate(() => {
		onEntryChange(fetchData);
	});
</script>

<RenderComponent pageComponents={Entry} blogPost={null} />
