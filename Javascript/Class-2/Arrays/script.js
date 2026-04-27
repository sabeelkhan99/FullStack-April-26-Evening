

const nums = [100, 200, 300, 400, 500, 600];

const arr = [true, "Hello world", 100, null, { a: 10, b: 20 }];

const board = [['X', 'O', 'X'], ['O', 'X', 'X']];

const cart = [{ title: 'Iphone', price: 100, qty: 2 }, { title: 'Macbook', price: 200, qty: 5 }];


// Loops

// for (let i = 0; i < nums.length; i++){
//     console.log(nums[i]);
// }


// let j = 0;

// while (j < nums.length) {
//     console.log(nums[j]);
//     j++;
// }

// Imperative
for (let i = 0; i < cart.length; i++){
    console.log(cart[i]);
}

// for-of loops - Iterable Objects (Iterator Protocol)
// arrays, string, set, Map

// Declarative
for (let product of cart) {
    console.log(product);
}

