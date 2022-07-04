<script lang="ts">
  import moment from 'moment';
  export let bloglist: any;
  let body = typeof bloglist.body === 'string' && bloglist.body.substr(0, 300);
  const stringLength = body.lastIndexOf(' ');
  body = `${body.substr(0, Math.min(body.length, stringLength))}...`;
</script>

{#if bloglist}
  <div class="blog-list">
    {#if bloglist.featured_image}
      <a href={bloglist.url} sveltekit:prefetch>
        <img
          class="blog-list-img"
          src={bloglist.featured_image.url}
          alt="blog img"
          {...bloglist.featured_image.$?.url}
        />
      </a>
    {/if}
    <div class="blog-content">
      {#if bloglist.title}
        <a href={bloglist.url}>
          <h3 {...bloglist.$?.title}>{bloglist.title}</h3>
        </a>
      {/if}
      <p>
        <strong {...bloglist.$?.date}>
          {moment(bloglist.date).format('ddd, MMM D YYYY')}
        </strong>,
        <strong {...bloglist.author[0].$?.title}>
          {bloglist.author[0].title}
        </strong>
      </p>
      <div {...bloglist.$?.body}>{@html body}</div>
      {#if bloglist.url}
        <a href={bloglist.url}>
          <span>Read more</span> -->
        </a>
      {/if}
    </div>
  </div>
{/if}
