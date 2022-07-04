<script lang="ts">
	import { getFooterRes, getHeaderRes, getPageRes } from '../helper/index.d';
	import { page } from '$app/stores';
	import JSONTree from 'svelte-json-tree';
	import { afterUpdate, onMount } from 'svelte';
	import ToolTip from './tool-tip.svelte';
	import type { Page } from 'src/model/page.model';
	import type { HeaderModel } from 'src/model/header.model';
	import type { FooterModel } from 'src/model/footer.model';
	let pageRes: Page;
	let headerRes: HeaderModel;
	let footerRes: FooterModel;
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
		let res = await getPageRes($page.url.pathname);
		pageRes = res;
	}
	async function getHeaderData() {
		let res = await getHeaderRes();
		headerRes = res;
	}
	async function getFooterData() {
		let res = await getFooterRes();
		footerRes = res;
	}
	onMount(() => {
		getPageData();
		getHeaderData();
		getFooterData();
	});
	afterUpdate(() => {
		if (url !== window.location.pathname) {
			url = window.location.pathname;
			getPageData();
		}
		if (forceUpdate !== 0) {
			setTimeout(() => (forceUpdate = 0), 3000);
		}
	});

	$: json = {
		response: {
			header: headerRes,
			footer: footerRes,
			page: pageRes
		}
	};
	$: filteredData = filterObject(json);
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
