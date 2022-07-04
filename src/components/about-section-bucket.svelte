<script lang="ts">
  import type { SectionWithBuckets } from 'src/model/page.model';
  export let sectionWithBuckets: SectionWithBuckets;
</script>

<div class="member-main-section">
  <div class="member-head">
    {#if sectionWithBuckets.title_h2}
      <h2 {...sectionWithBuckets.$?.title_h2}>
        {sectionWithBuckets.title_h2}
      </h2>
    {/if}
  </div>
  <div class="mission-section">
    <div class="mission-content-top">
      {#each sectionWithBuckets?.buckets as bucket, index}
        {#if index < 2}
          <div class="mission-content-section">
            {#if bucket.icon}
              <img
                {...bucket.icon.$?.url}
                class="mission-icon"
                src={bucket.icon.url}
                alt="art work"
              />
            {/if}
            <div class="mission-section-content">
              {#if bucket.title_h3}
                <h3 {...bucket.$?.title_h3}>{bucket.title_h3}</h3>
              {/if}
              {#if typeof bucket.description === 'string'}
                <div {...bucket.$?.description}>{@html bucket.description}</div>
              {/if}
            </div>
          </div>
        {/if}
      {/each}
    </div>
    <div class="mission-content-bottom">
      {#each sectionWithBuckets.buckets as bucket, index}
        {#if index >= 2}
          <div class="mission-content-section">
            {#if bucket.icon}
              <img
                {...bucket.icon.$?.url}
                class="mission-icon"
                src={bucket.icon.url}
                alt="art work"
              />
            {/if}
            <div class="mission-section-content">
              {#if bucket.title_h3}
                <h3 {...bucket.$?.title_h3}>{bucket.title_h3}</h3>
              {/if}
              {#if typeof bucket.description === 'string'}
                <div {...bucket.$?.description}>{@html bucket.description}</div>
              {/if}
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
