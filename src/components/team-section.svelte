<script lang="ts">
  import type { OurTeam } from 'src/model/page.model';

  export let ourTeam: OurTeam;
</script>

<div class="about-team-section">
  <div class="team-head-section">
    {#if ourTeam.title_h2}
      <h2 {...ourTeam.$?.title_h2}>{ourTeam.title_h2}</h2>
    {/if}
    {#if ourTeam.description}
      <p {...ourTeam.$?.description}>{ourTeam.description}</p>
    {/if}
  </div>
  <div class="team-content">
    {#each ourTeam.employees as employee}
      <div class="team-details">
        {#if employee.image}
          <img {...employee.image.$?.url} alt={employee.image.filename} src={employee.image.url} />
        {/if}
        <div class="team-details">
          {#if employee.name}
            <h3 {...employee.$?.name}>{employee.name}</h3>{/if}
          {#if employee.designation}
            <p {...employee.$?.designation}>{employee.designation}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
