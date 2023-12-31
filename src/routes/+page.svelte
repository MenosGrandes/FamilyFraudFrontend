<script>
  import Lives from "./Lives.svelte";
  import Answers from "./Answers.svelte";
  import { onMount } from "svelte";
  import {
    WebSocketCommunicationHandler,
  } from "$lib/db_handler.js";

  let _webSockerHandler;
  onMount(async () => {
    _webSockerHandler = new WebSocketCommunicationHandler();
  });
</script>

<div class="container">
  <Lives />
  <Answers />
  <Lives />
  {#if _webSockerHandler}
  <button on:click={_webSockerHandler.show()}>REVEAL</button>
  {/if}
</div>

<style>
  @font-face {
    font-family: "Familiada";
    src: url("fonts/familiada-nowa.otf") format("opentype");
  }
  .container {
    font-family: "Familiada";
    display: flex;
    justify-content: space-around;
    min-height: 100%;
    min-width: 100%;
    background-color: black;
    color: yellow;
    position: absolute;
    text-transform: uppercase;
    white-space: nowrap;
  }
</style>
