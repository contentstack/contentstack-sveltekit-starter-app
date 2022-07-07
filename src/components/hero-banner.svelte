<script lang="ts">
  import type { HeroBanner } from 'src/model/page.model';

  export let hero_banner: HeroBanner;
</script>

<div class="hero-banner" style="background: {hero_banner?.bg_color ? hero_banner.bg_color : ''}">
  <div class="home-content" style="color: {hero_banner.text_color || '#222222'}">
    {#if hero_banner.banner_title}
      <h1 class="hero-title" {...hero_banner.$?.banner_title}>{hero_banner.banner_title}</h1>
    {/if}
    {#if hero_banner.banner_description}
      <p
        class="hero-description"
        style={`color: ${hero_banner.text_color}` || '#222222'}
        {...hero_banner.$?.banner_description}
      >
        {hero_banner?.banner_description}
      </p>
    {/if}
    {#if hero_banner.call_to_action.title && hero_banner.call_to_action.href}
      <a
        class="btn tertiary-btn"
        {...hero_banner.call_to_action.$?.title}
        href={hero_banner?.call_to_action.href}
      >
        {hero_banner?.call_to_action.title}
      </a>
    {/if}
  </div>
  {#if hero_banner.banner_image}
    <img
      alt={hero_banner.banner_image.filename}
      src={hero_banner.banner_image.url}
      {...hero_banner.banner_image.$?.url}
    />
  {/if}
</div>
