import { nanoid } from "nanoid";

export class TOPIC {
  static SIZE = 0;
  static SHOW_ANSWER = this.SIZE++;
  static GET_NEW_ANSWERS = this.SIZE++;
  static NEW_ANSWERS = this.SIZE++;
  static LIFE_LOST = this.SIZE++;
  static SET_ID = this.SIZE++;
}

export class APP_TYPE {
  static SIZE = 0;
  static USER = this.SIZE++;
  static ADMIN = this.SIZE++;
}
export class Messages {
  static showAnswer(index) {
    return { topic: TOPIC.SHOW_ANSWER, index: index };
  }
  /*From client to server*/
  static getNewAnswers(amount_of_answers) {
    return {
      topic: TOPIC.GET_NEW_ANSWERS,
      amount_of_answers: amount_of_answers,
    };
  }
  static lifeLost() {
    return { topic: TOPIC.LIFE_LOST };
  }
  static setId(type) {
    return { topic: TOPIC.SET_ID, type: type };
  }
  /*From server to client*/
  static newAnswers(data) {
    return {
      topic: TOPIC.NEW_ANSWERS,
      question: data.question,
      multiplier: 1, // MenosGrandes TEMP
      answers: data.answers,
      /*

      answer: faker.person.fullName(),
      points: faker.number.int({ max: 100 }),
      id: nanoid(),
      isVisible: faker.number.int({ min: 1, max: 1000 }) % 2 ? true : false,

      */
    };
  }
}
