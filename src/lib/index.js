// place files you want to import through the `$lib` alias in this folder.
import { nanoid } from 'nanoid'

export let _answers = [
    { answer: 'ala ma kota' , points : 20,id: nanoid(), isVisible : true}, 
    { answer: "ala nie ma kota", points : 20,id: nanoid(), isVisible : false},
    { answer: 'ala nie ma kota',points : 20, id: nanoid(), isVisible : false},
    { answer: 'ala nie ma kota',points : 20, id: nanoid(), isVisible : true}

    ];

    export let _lives = 3;