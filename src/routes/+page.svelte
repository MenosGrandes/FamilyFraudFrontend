<script>
	import Answer from './Answer.svelte';
	import Live from './Live.svelte';

	import SumOfPoints from './SumOfPoints.svelte';
	import Lives from './Lives.svelte';
	import Answers from './Answers.svelte';
</script>

<div class="container">
	<Lives />
	<Answers />
	<Lives />
</div>



<style>
@font-face{
  font-family: 'Familiada';
  src: url('fonts/familiada-nowa.otf') format('opentype');
}
	.container {
		font-family: 'Familiada';
		display: flex;
		justify-content: space-around;
		min-height: 100%;
		min-width: 100%;
		background-color: black;
		color: yellow;
		position: absolute;
		text-transform: uppercase;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
