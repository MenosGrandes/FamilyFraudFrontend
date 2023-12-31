export class TOPIC {
  static SHOW_ANSWER = 1;
  static GET_NEW_ANSWERS = 2;
  static NEW_ANSWERS = 3;
}

export class Messages {
  static getNewAnswers(amount_of_answers) {
    return {
      topic: TOPIC.GET_NEW_ANSWERS,
      amount_of_answers: amount_of_answers,
    };
  }
  static newAnswers(data) {
    return {
      topic: TOPIC.NEW_ANSWERS,
      question : data.question,
      multiplier : 1, // MenosGrandes TEMP
      answers : data.answers
      /*

      answer: faker.person.fullName(),
      points: faker.number.int({ max: 100 }),
      id: nanoid(),
      isVisible: faker.number.int({ min: 1, max: 1000 }) % 2 ? true : false,

      */
    };
  }

  static showAnswer(index) {
    return { topic: TOPIC.SHOW_ANSWER, index: index };
  }
}
