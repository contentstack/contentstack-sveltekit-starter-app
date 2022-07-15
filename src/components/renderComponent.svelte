<script lang="ts">
  import type { BlogPostModel } from 'src/model/blogpost.model';
  import type { Page } from 'src/model/page.model';
  import AboutSectionBucket from './about-section-bucket.svelte';
  import BlogBanner from './blog-banner.svelte';
  import BlogSection from './blog-section.svelte';
  import CardSection from './card-section.svelte';
  import HeroBanner from './hero-banner.svelte';
  import SectionBucket from './section-bucket.svelte';
  import SectionWithHtmlCode from './section-with-html-code.svelte';
  import Section from './section.svelte';
  import TeamSection from './team-section.svelte';

  export let pageComponents: Page, blogPost: BlogPostModel[] | BlogPostModel | null;
</script>

<div>
  {#if pageComponents}
    {#each pageComponents?.page_components as component}
      {#if component.hero_banner}
        {#if blogPost}
          <BlogBanner blog_banner={component.hero_banner} />
        {:else}
          <HeroBanner hero_banner={component.hero_banner} />
        {/if}
      {/if}

      {#if component.section}
        <Section section={component.section} />
      {/if}

      {#if component.section_with_buckets}
        {#if component.section_with_buckets.bucket_tabular}
          <AboutSectionBucket sectionWithBuckets={component.section_with_buckets} />
        {:else}
          <SectionBucket section={component.section_with_buckets} />
        {/if}
      {/if}
      {#if component.from_blog}
        <BlogSection fromBlog={component.from_blog} />
      {/if}
      {#if component.section_with_cards}
        <CardSection cards={component.section_with_cards.cards} />
      {/if}

      {#if component.section_with_html_code}
        <SectionWithHtmlCode embedCode={component.section_with_html_code} />
      {/if}

      {#if component.our_team}
        <TeamSection ourTeam={component.our_team} />
      {/if}
    {/each}
  {/if}
</div>
