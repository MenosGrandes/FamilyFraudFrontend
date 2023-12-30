import express from "express";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import { WebSocketServer } from "ws";

const webserver = express()
  .use((req, res) =>
    res.sendFile("/websocket-client.html", { root: __dirname }),
  )
  .listen(3000, () => console.log(`Listening on ${3000}`));

///
const generateQuestions = (numberOfElems) => {
  let r = [];
  for (let i = 0; i < numberOfElems; i++) {
    r.push({
      answer: faker.person.fullName(),
      points: faker.number.int({ max: 100 }),
      id: nanoid(),
      isVisible: faker.number.int({ min: 1, max: 1000 }) % 2 ? true : false,
    });
  }
  return r;
};

const sockserver = new WebSocketServer({ port: 443 });
sockserver.on("connection", (ws) => {
  console.log("New Connection");
  ws.send(
    JSON.stringify(generateQuestions(faker.number.int({ max: 5, min: 2 }))),
  );
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (data) => {
    sockserver.clients.forEach((client) => {
      console.log(`distributing message: ${data}`);
      client.send(`${data}`);
    });
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});
