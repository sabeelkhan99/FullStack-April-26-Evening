

// Default parameters

function sum(x, y, z=5) {
    return x + y + z;
}

// console.log(sum(1, 2, 3));

// console.log(sum(1, 2));

// ------------------------------Spread Operator

const arr = [1, 2, 3];
const nums = [20, 30, 40, ...arr]

const baseObj = {
    a: 10,
    b: true,
    m: 20
}

const user = {
    name: 'Max',
    ...baseObj
}

// -----------------------------Rest Parameter

//Mandatory parameters = x, y, z
function sumOfSquare(x, y, z, ...args) {
    let res = 0;
    for (let val of args) {
        res += val ** 2;
    }
    return x ** 2 + y ** 2 + z ** 2 + res;
}

console.log(sumOfSquare(1, 1, 1));
console.log(sumOfSquare(2, 2, 2, 1, 2, 3));
console.log(sumOfSquare(2, 2, 2, 1, 2, 3, 1));
console.log(sumOfSquare(2, 2, 2, 1, 2, 3, 1, 1));

