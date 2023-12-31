import express from "express";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import { WebSocketServer } from "ws";
import { TOPIC,  Messages} from "../src/common/common_lib.js";

const webserver = express()
  .use((req, res) =>
    res.sendFile("/websocket-client.html", { root: __dirname }),
  )
  .listen(3000, () => console.log(`Listening on ${3000}`));

///
const showAnswer = (index) => {
console.log("SHOW ANSWER");
  return Messages.showAnswer(index);
};
const generateQuestions = (numberOfElems) => {
  console.log(numberOfElems);
  let r = [];
  for (let i = 0; i < numberOfElems; i++) {
    r.push({
      answer: faker.person.fullName(),
      points: faker.number.int({ max: 100 }),
      id: nanoid(),
      isVisible: faker.number.int({ min: 1, max: 1000 }) % 2 ? true : false,
    });
  }
  console.log(r);
  console.log("generateQuestions");
  /*

      question : data.question,
      multiplier : 1, // MenosGrandes TEMP
      answers : data.answers
  */
  const data = {
  question : faker.person.jobDescriptor(),
  answers : r
  };
  return Messages.newAnswers(data);
};

const generateMessage = (msg) => {
console.log("HANDLING" + msg.topic);
  switch (msg.topic) {
    case TOPIC.SHOW_ANSWER:
      return JSON.stringify(showAnswer(msg.index));
    case TOPIC.GET_NEW_ANSWERS:
      return JSON.stringify(generateQuestions(msg.amount_of_answers)); // MenosGrandes move it to a Message
  }
};
const sockserver = new WebSocketServer({ port: 443 });
sockserver.on("connection", (ws) => {
  console.log("CONNECTION ESTABLISHED");
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (data) => {
    const _data = JSON.parse(data);

    const msg = generateMessage(_data);
    sockserver.clients.forEach((client) => {
      console.log(`distributing message: ${msg}`);
      client.send(msg);
    });
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});
