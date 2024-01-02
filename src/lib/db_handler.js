import { answers } from "$lib/../stores/answers.js";
import { faker } from "@faker-js/faker";
import { TOPIC, Messages } from "$lib/../common/common_lib.js"; //MenosGrandes add this file into config..
import { get, readable, writable } from "svelte/store";

export class WebSocketCommunicationHandler {
  _send(msgCallback) {
    this.webSocket.send(JSON.stringify(msgCallback));
  }
  _handleMessage(msg) {
    const data = JSON.parse(msg.data);
    console.log("DATA AFTER PARSE");
    console.log(data);
    switch (data.topic) {
      case TOPIC.SHOW_ANSWER:
        var tmp = get(answers);
        tmp[data.index].isVisible = true;
        answers.set(tmp);
        break;
      case TOPIC.NEW_ANSWERS:
        answers.set(data.answers);
        break;
    }
  }
  constructor() {
    this.webSocket = new WebSocket("ws://localhost:443/");

    this.webSocket.onmessage = (event) => {
      this._handleMessage(event);
    };
    this.webSocket.onopen = () => {
      this._send(Messages.getNewAnswers(5));
    };
  }
  /*MenosGrandes this suppose to be send from the ADMINISTATOR APP, the one that is not visible for clients*/
  show() {
    this._send(Messages.showAnswer(faker.number.int({ min: 0, max: 4 })));
  }
  request_new() {
    this._send(Messages.getNewAnswers(faker.number.int({ min: 1, max: 5 })));
  }
  live_lost() {
    this._send(Messages.lifeLost());
  }
}
