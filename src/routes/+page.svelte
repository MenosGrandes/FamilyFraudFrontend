<script>
  import Lives from "./Lives.svelte";
  import Answers from "./Answers.svelte";
  import { onMount } from "svelte";
  import { answers } from "../stores/answers.js";
  import { get } from 'svelte/store'

  onMount(async () => {
    console.log("MOUNT");
    const webSocket = new WebSocket("ws://localhost:443/");
    webSocket.onmessage = (event) => {
		const _data = JSON.parse(event.data);
		answers.set(_data);
		console.log(_data)
    };
  });
/* ONLY TEMPORARY MG!*/
const reveal = () =>
{
  console.log("CLICK");
  console.log($answers);
  $answers[1].isVisible = true;
}
</script>

<div class="container">
  <Lives />
  <Answers />
  <Lives />
  <button on:click={reveal}>CLICK</button>
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
