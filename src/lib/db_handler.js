import { answers } from "$lib/../stores/answers.js";
import { faker } from "@faker-js/faker";
import { TOPIC, Messages } from "$lib/../common/common_lib.js"; //MenosGrandes add this file into config..

export let handleMessage = (msg) => {
  const data = JSON.parse(msg.data);
  console.log("DATA AFTER PARSE");
  console.log(data);
  switch (data.topic) {
    case TOPIC.SHOW_ANSWER:
      $answers[data.index].isVisible = true;
      break;
    case TOPIC.NEW_ANSWERS:
      answers.set(data.answers);
      break;
  }
};

export class WebSocketCommunicationHandler {
  constructor() {
    this.webSocket = new WebSocket("ws://localhost:443/");

    this.webSocket.onmessage = (event) => {
      console.log("ON MESSAGE");
      handleMessage(event);
    };
    this.webSocket.onopen = () => {
      console.log("SOCKET OPENED");
      this.webSocket.send(JSON.stringify(Messages.getNewAnswers(5)));
    };
  }
  /*MenosGrandes this suppose to be send from the ADMINISTATOR APP, the one that is not visible for clients*/
  show() {
    this.webSocket.send(
      JSON.stringify(Messages.showAnswer(faker.number.int({ min: 0, max: 5 }))),
    );
  }
}
