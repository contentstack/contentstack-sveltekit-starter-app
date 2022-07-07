<script lang="ts">
  import type { Section } from 'src/model/page.model';
  export let section: Section;
</script>

<div class="home-advisor-section">
  {#if section.image_alignment === 'Left'}
    <img {...section.image.$?.url} src={section.image.url} alt={section.image.filename} />
    <div class="home-content">
      {#if section.title_h2}
        <h2 {...section.$?.title_h2}>{section.title_h2}</h2>
      {/if}
      {#if section.description}
        <p {...section.$?.description}>{section.description}</p>
      {/if}
      {#if section.call_to_action.title && section.call_to_action.href}
        <a
          class="btn secondary-btn"
          {...section.call_to_action.$?.href}
          href={section.call_to_action.href}
        >
          {section.call_to_action.title}
        </a>
      {/if}
      <div />
    </div>
  {:else}
    <div class="home-content">
      {#if section.title_h2}
        <h2 {...section.$?.title_h2}>{section.title_h2}</h2>
      {/if}
      {#if section.description}
        <p {...section.$?.description}>{section.description}</p>
      {/if}
      {#if section.call_to_action.title && section.call_to_action.href}
        <a
          class="btn secondary-btn"
          {...section.call_to_action.$?.href}
          href={section.call_to_action.href}
        >
          {section.call_to_action.title}
        </a>
      {/if}
      <div />
    </div>
    <img {...section.image.$?.url} src={section.image.url} alt={section.image.filename} />
  {/if}
</div>
