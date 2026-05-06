// ----------------------------------Implicit Binding---------------------------

const person = {
    name: 'Max',
    age: 25,
    greet: function () {
        console.log(this);
    }
}

// 1. The function should be defined using function keyword.
// 2. Function should not be a arrow function.
// 3. in strict mode, the output may change

function fun() {
    console.log(this);
}

// fun(); // window.fun()

// --------------------------------Explicit Binding-------------------------------------

const car = {
    name: 'BMW',
    price: 1000
}

function fun(x, y) {
    const res = x + y;
    console.log(res);
    console.log(this);
}

// fun.call(car, 10, 20);

// This is just binding step
const f = fun.bind(person);

// 1000 ... lines code

// f(30, 40);




// Function expression
const sum = function (a, b) {
    return a + b;
}

// Arrow function
const sum1 = (a, b) => {
    return a + b;
}

// Arrow function implicit return.
const sum2 = (a, b) => a + b;


// Lexical Environment

let name = 'Sarah';

function printName() {
    console.log(name);
}

function speak() {
    let name = 'Max';
    console.log(name);
    printName();
}

// speak();

// console.log(this); //window object

const obj = {
    a: 10,
    m: true,
    greet: () => {
        console.log(this);
    }
}

// obj.greet();

const product = {
    title: 'Macbook',
    print: function () {
        //this-> product
        const obj = {
            a: 10,
            m: true,
            greet: () => {
                console.log(this);
            }
        }

        obj.greet();
    }
}

product.print();















