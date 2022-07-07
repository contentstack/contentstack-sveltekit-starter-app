<script lang="ts">
  import { getFooterRes, getHeaderRes, getPageRes, getBlogListRes } from '../helper/index';
  import { page } from '$app/stores';
  import JSONTree from 'svelte-json-tree';
  import { afterUpdate, onMount } from 'svelte';
  import ToolTip from './tool-tip.svelte';
  import type { HeaderModel } from 'src/model/header.model';
  import type { FooterModel } from 'src/model/footer.model';
  import type { Page } from 'src/model/page.model';
  import type { BlogPostModel } from 'src/model/blogpost.model';
  let pageRes: Page;
  let headerRes: HeaderModel;
  let footerRes: FooterModel;
  let blogListRes: BlogPostModel[];
  let json: any;
  let url = $page.url.pathname;
  let forceUpdate = 0;

  function filterObject(inputObject: any) {
    const unWantedProps = [
      '_version',
      'ACL',
      '_owner',
      '_in_progress',
      'created_at',
      'created_by',
      'updated_at',
      'updated_by',
      'publish_details'
    ];
    for (const key in inputObject) {
      unWantedProps.includes(key) && delete inputObject[key];
      if (typeof inputObject[key] !== 'object') {
        continue;
      }
      inputObject[key] = filterObject(inputObject[key]);
    }
    return inputObject;
  }

  function copyObject(object: any) {
    forceUpdate = 1;
    navigator.clipboard.writeText(object);
  }

  async function getPageData() {
    if (url.includes('/blog')) {
      let res = await getPageRes('/blog');
      pageRes = res;
    } else {
      let res = await getPageRes(url);
      pageRes = res;
    }
  }
  async function getHeaderData() {
    let res = await getHeaderRes();
    headerRes = res;
  }
  async function getFooterData() {
    let res = await getFooterRes();
    footerRes = res;
  }
  async function getBlogListData() {
    let res = await getBlogListRes();
    blogListRes = res;
  }

  $: if (url.includes('/blog')) {
    json = {
      header: headerRes,
      footer: footerRes,
      page: pageRes,
      blogList: blogListRes
    };
  } else {
    json = {
      header: headerRes,
      footer: footerRes,
      page: pageRes
    };
  }

  $: filteredData = filterObject(json);
  onMount(() => {
    getPageData();
    getHeaderData();
    getFooterData();
    if (url.includes('/blog')) {
      getBlogListData();
    }
  });
  $: if (url.includes('/blog')) {
    getBlogListData();
  }
  $: if (forceUpdate !== 0) {
    setTimeout(() => (forceUpdate = 0), 3000);
  }
  afterUpdate(() => {
    if (url !== window.location.pathname) {
      url = window.location.pathname;
      getPageData();
    }
  });
</script>

<div
  class="modal fade"
  id="staticBackdrop"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabIndex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
  role="dialog"
  style="width: 100%;"
>
  <div class="modal-dialog .modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="devtools-modal-title" id="staticBackdropLabel">JSON Preview</h2>
        <div>
          <span
            class="json-copy"
            on:click={(e) => copyObject(JSON.stringify(filteredData))}
            aria-hidden="true"
          >
            <ToolTip content={forceUpdate === 0 ? 'Copy' : 'Copied'} direction="top">
              <img src="/copy.svg" alt="copy icon" />
            </ToolTip>
          </span>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
      </div>
      <div class="modal-body">
        {#if filteredData}
          <pre id="jsonViewer">
                  <JSONTree value={filteredData} />
              </pre>
        {/if}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn tertiary-btn modal-btn" data-bs-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</div>
