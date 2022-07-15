<script lang="ts">
  import { getHeaderRes } from '../helper/index';
  import { page } from '$app/stores';
  import type { HeaderModel } from '../model/header.model';
  import ToolTip from './tool-tip.svelte';
  let headerData: HeaderModel;
  const fetchData = async () => {
    let response = await getHeaderRes();
    return response;
  };
  $: fetchData().then((response) => (headerData = response));
</script>

<header class="header">
  <div class="note-div">
    {#if headerData?.notification_bar.show_announcement}
      {#if typeof headerData.notification_bar.announcement_text === 'string'}
        <div {...headerData.notification_bar.$?.announcement_text}>
          <p>{@html headerData.notification_bar.announcement_text}</p>
        </div>
      {/if}
    {/if}
  </div>
  <div class="max-width header-div">
    <div class="wrapper-logo">
      {#if headerData}
        <a class="logo-tag" title="Contentstack" href="/" sveltekit:prefetch>
          <img
            class="logo"
            src={headerData.logo.url}
            alt={headerData.title}
            title={headerData.title}
            {...headerData.logo.$?.url}
          />
        </a>
      {/if}
    </div>
    <input class="menu-btn" type="checkbox" id="menu-btn" />
    <label class="menu-icon" for="menu-btn">
      <span class="navicon" />
    </label>
    <nav class="menu">
      <ul class="nav-ul header-ul">
        {#if headerData}
          {#each headerData.navigation_menu as list}
            <li key={list.label} class="nav-li" {...list.page_reference[0].$?.url}>
              <a
                href={list.page_reference[0].url}
                class={$page.url.pathname === list.page_reference[0].url ? 'active' : ''}
                sveltekit:prefetch
              >
                {list.label}
              </a>
            </li>
          {/each}
        {/if}
      </ul>
    </nav>
    {#if headerData}
      <div class="json-preview">
        <ToolTip content="JSON Preview" direction="top">
          <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <img src="/json.svg" alt="JSON Preview icon" />
          </span>
        </ToolTip>
      </div>
    {/if}
  </div>
</header>
