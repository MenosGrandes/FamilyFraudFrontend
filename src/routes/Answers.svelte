<script>
  import { answers } from "../stores/answers";
  import Answer from "./Answer.svelte";
  import SumOfPoints from "./SumOfPoints.svelte";
</script>

<div>
  {#if $answers}
    <div class="answers_container">
      {#each $answers as answer, index (answer.id)}
        <Answer
          isVisible={answer.isVisible}
          answer={answer.answer}
          {index}
          points={answer.points}
        />
      {/each}
    </div>
    <SumOfPoints />
  {/if}
</div>

<style>
  .answers_container {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    background-color: black;
    color: yellow;
    min-height: 90%;
  }
</style>
