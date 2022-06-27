<script lang="ts">
	import { getPageRes, getBlogListRes } from '../../helper/index.d';
	import { page } from '$app/stores';
	import ArchiveRelative from '../../components/archive-relative.svelte';
	import RenderComponents from '../../components/renderComponent.svelte';
	import moment from 'moment';

	let post: any;
	let banner: any;
	let blogList: any;
	let url = $page.params.post;
	const fetchBlogList = async () => {
		let result = await getBlogListRes();
		return result;
	};
	const fetchBannerData = async () => {
		let result = await getPageRes('/blog');
		return result;
	};
	$: fetchBlogList().then((val) => (blogList = val));
	$: fetchBlogList()
		.then((val) =>
			val.filter((blog: any) => {
				let params = blog.url.slice(6);
				return params === url;
			})
		)
		.then((val) => (post = val[0]));

	$: fetchBannerData().then((val) => (banner = val));
</script>

{#if banner}
	<RenderComponents
		pageComponents={banner}
		blogPost={post}
		contentTypeUid="blog_post"
		entryUid={banner.uid}
		locale={banner.locale}
	/>
{/if}

<div class="blog-container">
	<article class="blog-detail">
		{#if post && post.title}
			<h2 {...post.$?.title}>{post.title}</h2>
		{/if}
		{#if post && post.date}
			<p {...post.$?.date}>
				{moment(post.date).format('ddd, MMM D YYYY')},{' '}
				<strong {...post.author[0].$?.title}>
					{post.author[0].title}
				</strong>
			</p>
		{/if}
		{#if post && post.body}
			<div {...post.$?.body}>{@html post.body}</div>
		{/if}
	</article>
	<div class="blog-column-right">
		<div class="related-post">
			{#if banner && banner?.page_components[2].widget}
				<h2 {...banner?.page_components[2].widget.$?.title_h2}>
					{banner?.page_components[2].widget.title_h2}
				</h2>
			{/if}
			{#if post && post.related_post}
				<ArchiveRelative {...post.$?.related_post} blogs={blogList} />
			{/if}
		</div>
	</div>
</div>
