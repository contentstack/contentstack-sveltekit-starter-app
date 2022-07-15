<script lang="ts">
  import type { SectionWithHtmlCode } from 'src/model/page.model';

  export let embedCode: SectionWithHtmlCode;
</script>

{#if embedCode.html_code_alignment === 'Left'}
  <div class="contact-page-section max-width">
    <div class="contact-page-content">
      {#if embedCode.title}
        <h1 {...embedCode.$?.title}>{embedCode.title}</h1>
      {/if}
      {#if typeof embedCode.description === 'string'}
        <div {...embedCode.$?.description}>
          {@html embedCode.description}
        </div>
      {/if}
    </div>
    <div class="contact-page-form">
      {#if typeof embedCode.html_code === 'string'}
        <div {...embedCode.$?.html_code}>{@html embedCode.html_code}</div>
      {/if}
    </div>
  </div>
{:else}
  <div class="contact-maps-section max-width">
    <div class="maps-details">
      {#if typeof embedCode.html_code === 'string'}
        <div {...embedCode.$?.html_code}>{@html embedCode.html_code}</div>
      {/if}
    </div>
    <div class="contact-maps-content">
      {#if embedCode.title}
        <h2 {...embedCode.$?.title}>{embedCode.title}</h2>
      {/if}
      {#if typeof embedCode.description === 'string'}
        <div {...embedCode.$?.description}>{@html embedCode.description}</div>
      {/if}
    </div>
  </div>
{/if}
