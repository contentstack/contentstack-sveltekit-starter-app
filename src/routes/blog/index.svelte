<script lang="ts">
	import BlogList from '../../components/blog-list.svelte';
	import ArchiveRelative from '../../components/archive-relative.svelte';
	import RenderComponents from '../../components/renderComponent.svelte';
	import { getPageRes, getBlogListRes } from '../../helper/index.d';
	import type { BlogPostModel } from 'src/model/blogpost.model';

	let getList: BlogPostModel[];
	let getEntry: any;
	let archived: BlogPostModel[] = [];
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
	$: getList &&
		getList.map((post: BlogPostModel) => {
			if (post.is_archived) {
				archived.push(post);
			}
			archived = archived;
		});
</script>

<RenderComponents pageComponents={getEntry} blogPost={getList} />
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
			<h2 style="margin-bottom: 25px">{getEntry.page_components[1].widget.title_h2}</h2>
		{/if}
		{#if getList}
			<ArchiveRelative blogs={archived} />
		{/if}
	</div>
</div>
