<script>
</script>

<div class="live-container">
	<div class="row">
		<div>fig</div>
	</div>
	<div class="break-column" />
	<div class="row">
		<div class="non_visible">h</div>
		<div>h</div>
		<div class="non_visible">h</div>
	</div>
	<div class="break-column" />
	<div class="row">
		<div>gjf</div>
	</div>
</div>

<style>

	.break-column {
		flex-basis: 100%;
		width: 0;
	}
	.row {
		display: flex;
		flex-flow: row;
		min-width: 100%;
	}
	.live-container {
		display: flex;
		flex-flow: column;
		justify-content: space-evenly;
		text-align: center;
		text-transform: lowercase;
		row-gap: 5px;
		flex-basis: auto;
	}
	.non_visible
	{
		opacity: 0;
	}
</style>
