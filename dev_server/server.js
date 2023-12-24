import express from 'express'
import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker';
const webserver = express()
 .use((req, res) =>
   res.sendFile('/websocket-client.html', { root: __dirname })
 )
 .listen(3000, () => console.log(`Listening on ${3000}`))
import { WebSocketServer } from 'ws'

///
export let _answers = [
  { answer: 'ala ma kota' , points : 11,id: nanoid(), isVisible : true}, 
  { answer: "ala nie ma kota2", points : 14,id: nanoid(), isVisible : false},
  { answer: 'ala nie ma kota3',points : 6, id: nanoid(), isVisible : false},
  { answer: 'ala nie ma kota4',points : 32, id: nanoid(), isVisible : true}

  ];

///
const generateQuestions = (numberOfElems) =>
{
  let r = [];
  for ( let i = 0 ; i < numberOfElems;i++)
  { 
   r.push({answer : faker.person.fullName(), 
          points : faker.number.int({ max: 100 }),
           id : nanoid(),
            isVisible : true}
          )
   }
          return r;

}


const sockserver = new WebSocketServer({ port: 443 })
sockserver.on('connection', ws => {
 ws.send(JSON.stringify(generateQuestions(faker.number.int({ max: 5, min : 2 }))))
 ws.on('close', () => console.log('Client has disconnected!'))
 ws.on('message', data => {
   sockserver.clients.forEach(client => {
     console.log(`distributing message: ${data}`)
     client.send(`${data}`)
   })
 })
 ws.onerror = function () {
   console.log('websocket error')
 }
})