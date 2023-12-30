<script>
  import { visiblePoints } from "../stores/answers";

</script>

<div>
  <div class="sum_of_points">
  <div class="">SUMA</div>
  <div class="">{$visiblePoints}</div>
  </div>
  </div>

<style>
  .sum_of_points
{
  display:flex;
  font-weight: bold;
  font-size: 3em;
  text-align: right;
  overflow: hidden;
  height: 2em;
  padding-right: 5%;
  flex-direction:row;
  align-items:start;
  justify-content: right;
  gap: 1em;
}

</style>
