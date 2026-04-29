
const person = {
    name: 'Max',
    age: 25,
    isAdult: true
}

const a = Object.create(person);

a.name = 'John';

const b = Object.create(a);