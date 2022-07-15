<script lang="ts">
  import type { BlogPostModel } from 'src/model/blogpost.model';
  export let blogs: BlogPostModel[];
</script>

{#each blogs as blog}
  <a href={blog.url} sveltekit:prefetch>
    <div>
      <h4 {...blog.$?.title}>{blog.title}</h4>
      {#if typeof blog.body === 'string'}
        <div {...blog.$?.body}>{@html blog.body.slice(0, 80)}</div>
      {/if}
    </div>
  </a>
{/each}
