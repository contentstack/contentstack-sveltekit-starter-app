<script lang="ts">
  import type { HeroBanner } from 'src/model/page.model';
  export let blog_banner: HeroBanner;
</script>

<div
  class="blog-page-banner"
  style="background: ${blog_banner.bg_color ? blog_banner.bg_color : ''}"
>
  <div class="blog-page-content" style="color: {blog_banner.text_color || '#222222'}">
    {#if blog_banner.banner_title}
      <h1 class="hero-title" {...blog_banner.$?.banner_title}>
        {blog_banner.banner_title}
      </h1>
    {/if}

    {#if blog_banner.banner_description}
      <p
        class="hero-description"
        {...blog_banner.$?.banner_description}
        style="color: ${blog_banner.text_color || '#222222'}"
      >
        {blog_banner.banner_description}
      </p>
    {/if}
  </div>
</div>
