<script lang="ts">
	import RenderComponent from '../components/renderComponent.svelte';
	import { getPageRes } from '../helper/index.d';
	import { page } from '$app/stores';

	let Entry: any;
	const fetchData = async () => {
		let entryRes = await getPageRes('/');
		return entryRes;
	};
	$: fetchData().then((response) => (Entry = response));
</script>

<RenderComponent
	pageComponents={Entry}
	blogPost={null}
	entryUid={Entry?.uid}
	contentTypeUid="page"
	locale={Entry?.locale}
/>
