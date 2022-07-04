<script lang="ts">
  import type { SectionWithBuckets, SectionWithCards } from 'src/model/page.model';

  export let section: SectionWithBuckets;
</script>

<div class="member-main-section">
  <div class="member-head">
    {#if section.title_h2}
      <h2 {...section.$?.title_h2}>{section.title_h2}</h2>
    {/if}
    {#if section.description}
      <p {...section.$?.description}>{section.description}</p>
    {/if}
  </div>
  <div class="member-section">
    {#each section.buckets as bucket}
      <div class="content-section">
        {#if bucket.icon}
          <img {...bucket.icon.$?.url} src={bucket.icon.url} alt="bucket icon" />
        {/if}

        {#if bucket.title_h3}
          <h3 {...bucket.$?.title_h3}>{bucket.title_h3}</h3>
        {/if}
        {#if typeof bucket.description === 'string'}
          <div {...bucket.$?.description}>{@html bucket.description}</div>
        {/if}
        {#if bucket.call_to_action.title}
          <a
            {...bucket.call_to_action.$?.href}
            href={bucket.call_to_action.href ? bucket.call_to_action.href : '#'}
          >
            {bucket.call_to_action.title} -->
          </a>
        {/if}
      </div>
    {/each}
  </div>
</div>
