<script>
  import { answers } from "../stores/answers";
  import Answer from "./Answer.svelte";
  import SumOfPoints from "./SumOfPoints.svelte";
</script>

<div class="answers_container">
  {#if $answers}
    <div >
      {#each $answers as answer, index (answer.id)}
        <Answer bind:answer={answer} {index}/>
      {/each}
    </div>
    <SumOfPoints />
  {/if}
</div>

<style>
  .answers_container {
    display: flex;
    flex: 4 1 0;
    flex-flow: column;
    justify-content: space-around;
    background-color: black;
    color: yellow;
    min-height: 90%;
  }
</style>
