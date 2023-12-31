<script>
  import { _lives as lives } from "$lib";
  import Live from "./Live.svelte";
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
    font-size: 5em;
    text-transform: lowercase;
    padding: 0px;
    margin: 0px;

    padding-left: 20px;
    padding-right: 20px;
  }
</style>
