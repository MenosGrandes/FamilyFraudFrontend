<script>
  import Answer from "./Answer.svelte";
  import Live from "./Live.svelte";
  import { WebSocketServer } from "ws";

  import SumOfPoints from "./SumOfPoints.svelte";
  import Lives from "./Lives.svelte";
  import Answers from "./Answers.svelte";
  import { onMount } from "svelte";
  import { answers } from "../stores/answers.js";

  onMount(async () => {
    const webSocket = new WebSocket("ws://localhost:443/");
    webSocket.onmessage = (event) => {
		const _data = JSON.parse(event.data);
		answers.set(_data);
		console.log(_data)
    };
  });
</script>

<div class="container">
  <Lives />
  <Answers />
  <Lives />
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
