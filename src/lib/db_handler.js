import { answers } from "$lib/../stores/answers.js";
import { faker } from "@faker-js/faker";
import { TOPIC, Messages } from "$lib/../common/common_lib.js"; //MenosGrandes add this file into config..
import { get, readable, writable } from "svelte/store";
import { APP_TYPE } from "../common/common_lib";
import { nanoid } from "nanoid";

export class WebSocketCommunicationHandler {
  _send(msgCallback) {
    msgCallback["id"] = this.app_id;
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
    this.webSocket = new WebSocket("ws://localhost:9001/");

    this.webSocket.onmessage = (event) => {
      this._handleMessage(event);
    };
    this.webSocket.onopen = () => {
      if (!this.app_id) {
        this.app_id = nanoid();
        console.log(this.app_id + "generated ID");
      }
      this._send(Messages.setId(APP_TYPE.USER));
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
