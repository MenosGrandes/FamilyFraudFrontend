import express from "express";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import { WebSocketServer } from "ws";
import { APP_TYPE, Messages, TOPIC } from "../src/common/common_lib.js";

const webserver = express()
  .use((req, res) =>
    res.sendFile("/websocket-client.html", { root: __dirname }),
  )
  .listen(3000, () => console.log(`Listening on ${3000}`));

///

export class DISTRIBUTION_DIRECTION {
  static SIZE = 0;
  static TO_ADMIN_APP = this.SIZE++;
  static TO_CLIENT_APP = this.SIZE++;
  static BOTH_WAYS = this.SIZE++;
}

class MessageHandler {
  constructor(messageWrapperCallback) {
    this.clients = new Map();
    this.handler = {};
    this.distributor = new Map();

    this.handler[TOPIC.SHOW_ANSWER] = (msg) => {
      return this._showAnswer(msg);
    };
    this.handler[TOPIC.GET_NEW_ANSWERS] = (msg) => {
      return this._generateQuestions(msg);
    };
    this.handler[TOPIC.LIFE_LOST] = (msg) => {
      return this._lifeLost(msg);
    };
    this.handler[TOPIC.NEW_ANSWERS] = (msg) => {
      return this._errorMessageHandler(msg);
    };
    this.handler[TOPIC.SET_ID] = (msg, ws) => {
      return this._setId(msg, ws);
    };
    /*Multimap would be better..*/
    this.distributor.set(
      TOPIC.SHOW_ANSWER,
      DISTRIBUTION_DIRECTION.TO_CLIENT_APP,
    );
    this.distributor.set(
      TOPIC.GET_NEW_ANSWERS,
      DISTRIBUTION_DIRECTION.BOTH_WAYS,
    );
    this.distributor.set(TOPIC.LIFE_LOST, DISTRIBUTION_DIRECTION.TO_CLIENT_APP);
    this.setMessagesTypes(messageWrapperCallback);
  }

  _showAnswer(msg) {
    return Messages.showAnswer(msg.index);
  }
  _generateQuestions(msg) {
    const numberOfElems = msg.amount_of_answers;
    let r = [];
    for (let i = 0; i < numberOfElems; i++) {
      r.push({
        answer: faker.person.fullName(),
        points: faker.number.int({ max: 100 }),
        id: nanoid(),
        isVisible: false,
      });
    }
    const data = {
      question: faker.person.jobDescriptor(),
      answers: r,
    };
    return Messages.newAnswers(data);
  }
  _lifeLost() {
    return Messages.lifeLost();
  }
  _errorMessageHandler(msg) {
    console.error("This msg should not be handled by server");
    console.error(msg);
  }
  _setId(msg, ws) {
    this.clients.set(msg.id, { type: msg.type, client: ws });
  }
  onMessageHandle(msg, ws) {
    console.log(msg);
    console.log("HANDLING " + msg.topic);
    return this.messageWrapper(this.handler[msg.topic](msg, ws));
  }
  setMessagesTypes(messageWrapper) {
    this.messageWrapper = messageWrapper;
  }
}
const messagHandler = new MessageHandler((msg) => {
  return JSON.stringify(msg);
});

const getAppOfType = (typeOfApp, idOfSender) => {
  const allWs = [];
  for (let [key, value] of messagHandler.clients.entries()) {
    if (value.type === typeOfApp && key != idOfSender) {
      allWs.push(value.client);
    }
  }
  return allWs;
};

const sockserver = new WebSocketServer({ port: 443 });
sockserver.on("connection", (ws) => {
  console.log("CONNECTION ESTABLISHED");
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (data) => {
    const _data = JSON.parse(data);
    const msg = messagHandler.onMessageHandle(_data, ws);
    if (msg) {
      const WHERE_TO_SEND = messagHandler.distributor.get(_data.topic);
      if (WHERE_TO_SEND == DISTRIBUTION_DIRECTION.BOTH_WAYS) {
        sockserver.clients.forEach((client) => {
          client.send(msg);
        });
      } else if (WHERE_TO_SEND == DISTRIBUTION_DIRECTION.TO_CLIENT_APP) {
        const _clients = getAppOfType(APP_TYPE.USER);
        _clients.forEach((client) => {
          client.send(msg);
        });
      } else if (WHERE_TO_SEND == DISTRIBUTION_DIRECTION.TO_ADMIN_APP) {
        const _clients = getAppOfType(APP_TYPE.ADMIN);
        _clients.forEach((client) => {
          client.send(msg);
        });
      }
    }
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});
