<script lang="ts">
	import BlogList from '../../components/blog-list.svelte';
	import ArchiveRelative from '../../components/archive-relative.svelte';
	import RenderComponents from '../../components/renderComponent.svelte';
	import { getPageRes, getBlogListRes } from '../../helper/index.d';

	let getList: any;
	let getEntry: any;
	const fetchBlogData = async () => {
		let result = await getPageRes('/blog');
		return result;
	};
	const fetchBlogList = async () => {
		let result = await getBlogListRes();
		return result;
	};

	$: fetchBlogData().then((blogData) => (getEntry = blogData));
	$: fetchBlogList().then((blogList) => (getList = blogList));
</script>

<RenderComponents
	pageComponents={getEntry}
	blogPost={getList}
	entryUid={getEntry?.uid}
	contentTypeUid="page"
	locale={getEntry?.locale}
/>
<div class="blog-container">
	<div class="blog-column-left">
		{#if getList}
			{#each getList as blogList}
				{#if !blogList.is_archived}
					<BlogList bloglist={blogList} />
				{/if}
			{/each}
		{/if}
	</div>
	<div class="blog-column-right">
		{#if getEntry && getEntry.page_components[1].widget}
			<h2>{getEntry.page_components[1].widget.title_h2}</h2>
		{/if}
		{#if getList}
			<ArchiveRelative blogs={getList} />
		{/if}
	</div>
</div>
