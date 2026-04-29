
// var a = 100;

// function fun() {
//     var b = 300;
//     console.log(b);
//     console.log(c);
// }

// fun();

// console.log(b);

// -------------------------------Scope Chain---------------

var name = 'Max';

function sayName() {
    console.log(name);

    function innerFun() {
        console.log('Inner fun');
    }

    innerFun();

}

function print() {
    var name = 'John';
    console.log(name);
    sayName();
}

// print();

// ----------------------------------Functional scope

// function sum() {
//     var b = 200;
//     console.log(b);
// }

// sum();

// console.log(b);

// --------------------------------Script and Block Scope---------

// script scope
// let a = 100;

// {
//     let a = 200;
//     console.log(a);
// }

// console.log(a);

// ----------------------- var keyword

// Global Scope - window 
{
    a: 200
}

var a = 100;

{
    var a = 200;
    console.log(a); //200
}

console.log(a); //200

