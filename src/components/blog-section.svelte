<script lang="ts">
  import type { FromBlog } from 'src/model/page.model';
  export let fromBlog: FromBlog;
</script>

<div class="community-section">
  <div class="community-head">
    {#if fromBlog.title_h2}
      <h2 {...fromBlog.$?.title_h2}>{fromBlog.title_h2}</h2>
    {/if}
    {#if fromBlog.view_articles}
      <a
        class="btn secondary-btn article-btn"
        {...fromBlog.view_articles.$?.title}
        href={fromBlog.view_articles.href}
      >
        {fromBlog.view_articles.title}
      </a>
    {/if}
  </div>
  <div class="home-featured-blogs">
    {#each fromBlog.featured_blogs as blog}
      <div class="featured-blog">
        {#if blog.featured_image}
          <img
            src={blog.featured_image.url}
            alt={blog.featured_image.filename}
            {...blog.featured_image.$?.url}
            class="blog-post-img"
          />
        {/if}
        <div class="featured-content">
          {#if blog.title}<h3 {...blog.$?.title}>{blog.title}</h3>{/if}
          {#if typeof blog.body === 'string'}
            <div {...blog.$?.body}>{@html blog.body.slice(0, 300)}</div>
          {/if}
          {#if blog.url}
            <a class="blogpost-readmore" href={blog.url}>{'Read More'} --></a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
