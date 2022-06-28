<script lang="ts">
	import RenderComponent from '../components/renderComponent.svelte';
	import { getPageRes } from '../helper/index.d';
	import { page } from '$app/stores';

	let Entry: any;
	const fetchData = async () => {
		let entryRes = await getPageRes($page.url.pathname);
		Entry = entryRes;
	};
	fetchData();
</script>

<RenderComponent pageComponents={Entry} blogPost={null} />
