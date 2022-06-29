<script lang="ts">
	import RenderComponent from '../components/renderComponent.svelte';
	import { getPageRes } from '../helper/index.d';
	import type { Page } from 'src/model/page.model';

	let Entry: Page;
	const fetchData = async () => {
		let entryRes = await getPageRes('/');
		Entry = entryRes;
	};
	fetchData();
</script>

<RenderComponent pageComponents={Entry} blogPost={null} />
