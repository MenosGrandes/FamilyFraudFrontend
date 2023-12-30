<script>
	export let isVisible = false;
	export let answer;
	export let index;
	export let points;
	let className = isVisible ? "answer" : "non_visible answer";
    export { className as class };
</script>

<div class="row">
	<div class="number">{index+1}</div>
	<div class="{className}">{isVisible ? answer : ''}</div>
	<div class="points">{isVisible ? points : '=='}</div>
</div>

<style>
	.row {
		display: flex;
		padding: 5px;
		margin-top: 10px;
		font-weight: bold;
		font-size: 3em;
		text-align: left;
		flex-direction: row wrap;
		overflow: hidden;
		height: 2em;
	}
	.number {
		display: flex;
		width: 10%
		
	}
	.answer {
		margin-left: 20px;
		justify-content: left;
		width: 100%;
		height: 1em;			
	}
	.non_visible{
		border-bottom: 3px dotted yellow;
	}
	.points {
		margin-left: 20px;
		width: 5em;
		width: 10%;
	}
</style>
