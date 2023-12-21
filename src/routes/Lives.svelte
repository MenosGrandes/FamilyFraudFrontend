<script>
	import { _lives as lives } from '$lib';
	import Live from './Live.svelte';
</script>

<div class="lives">
	{#each { length: lives } as _}
		<Live />
	{/each}
</div>

<style>
	.lives {
		display: flex;
		flex-flow: column;
		justify-content: space-around;
		text-align: center;
		font-size: 200%;
		text-transform: lowercase;
		width: 10%;
	}
</style>
