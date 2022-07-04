<script lang="ts">
  import type { SectionWithCards } from 'src/model/page.model';
  export let cards: any;
</script>

<div class="demo-section">
  {#each cards as card}
    <div class="cards">
      {#if card.title_h3}
        <h3 {...card.$?.title_h3}>{card.title_h3}</h3>
      {/if}
      {#if card.description}
        <p {...card.$?.description}>{card.description}</p>
      {/if}
      <div class="card-cta">
        {#if card.call_to_action.title && card.call_to_action.href}
          <a
            {...card.call_to_action.$?.title}
            class="btn primary-btn"
            href={card.call_to_action.href}
          >
            {card.call_to_action.title}
          </a>
        {/if}
      </div>
    </div>
  {/each}
</div>
