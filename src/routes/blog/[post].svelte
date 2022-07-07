<script lang="ts">
  import { getPageRes, getBlogPostRes } from '../../helper/index';
  import { page } from '$app/stores';
  import ArchiveRelative from '../../components/archive-relative.svelte';
  import RenderComponents from '../../components/renderComponent.svelte';
  import moment from 'moment';
  import { afterUpdate, onMount } from 'svelte';
  import type { BlogPostModel } from 'src/model/blogpost.model';
  import { onEntryChange } from '../../sdk';
  let post: BlogPostModel;
  let banner: any;
  let url = `/blog/${$page.params.post}`;

  const fetchBannerData = async () => {
    let result = await getPageRes('/blog');
    banner = result;
  };
  const getRelatedData = async () => {
    let result = await getBlogPostRes(url);
    post = result;
  };

  onMount(() => {
    fetchBannerData();
    getRelatedData();
    onEntryChange(getRelatedData);
  });

  afterUpdate(() => {
    url = `/blog/${$page.params.post}`;
    if (post && post.url !== url) {
      getRelatedData();
    }
  });
</script>

{#if banner}
  <RenderComponents pageComponents={banner} blogPost={post} />
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
        <h2 {...banner?.page_components[2].widget.$?.title_h2} style="margin-bottom: 25px;">
          {banner?.page_components[2].widget.title_h2}
        </h2>
      {/if}
      {#if post && post.related_post}
        <ArchiveRelative {...post.$?.related_post} blogs={post.related_post} />
      {/if}
    </div>
  </div>
</div>
