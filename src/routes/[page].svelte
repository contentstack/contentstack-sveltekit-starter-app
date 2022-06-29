<script lang="ts">
	import RenderComponent from '../components/renderComponent.svelte';
	import { getPageRes } from '../helper/index.d';
	import { page } from '$app/stores';
	import type { Page } from 'src/model/page.model';
	import { afterUpdate } from 'svelte';

	let Entry: Page;
	let url: String = $page.url.pathname;
	const fetchData = async () => {
		let entryRes = await getPageRes(url);
		Entry = entryRes;
	};
	fetchData();
	afterUpdate(() => {
		if (url !== window.location.pathname) {
			url = window.location.pathname;
			fetchData();
		}
	});
</script>

<RenderComponent pageComponents={Entry} blogPost={null} />
