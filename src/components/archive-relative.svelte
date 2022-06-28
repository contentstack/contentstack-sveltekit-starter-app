<script lang="ts">
	export let blogs: any;
</script>

{#each blogs as blog}
	<a href={blog.url}>
		<div>
			<h4 {...blog.$?.title}>{blog.title}</h4>
			{#if typeof blog.body === 'string'}
				<div {...blog.$?.body}>{@html blog.body.slice(0, 80)}</div>
			{/if}
		</div>
	</a>
{/each}
