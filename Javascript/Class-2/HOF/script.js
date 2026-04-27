

// function a() {
//     return function (x,y) {
//         return x + y;
//     }
// }

// const f = a();

// console.log(f(2,3));

// function fun(cb) {
//     cb();
// }

// function greet() {
//     console.log('Greeting from function');
// }

// fun(greet);

// `greet` is being passed as an argument to `fun` function
// - greet => Callback function
// - fun => HOF



const arrayOfRadius = [1, 2, 3, 4, 5, 6, 7];

// perimeters = [6.28, val, val2, val....] - 2*3.14*radius
// areas = [....................] - 3.14 * radius * radius
// diameter = [...........] - 2*radius

// const arr = [1, 2, 3, 4, 5, 6, 7];
// const peri = []
// const area = []
// const d = []
// for (let i = 0; i < arr.length; i++) {
//     let res = 2 * 3.14 * arr[i]
//     peri.push(res)
//     let a = 3.14 * arr[i] * arr[i]
//     area.push(a)
//     let dia = 2 * arr[i]
//     d.push(dia)
// }
// console.log(peri)
// console.log(area)
// console.log(d)

function calculatePerimeters(arrayOfRadius) {
    const res = [];
    for (const radius of arrayOfRadius) {
        res.push(2 * Math.PI * radius);
    }
    return res;
}

function calculateAreas(arrayOfRadius) {
    const res = [];
    for (const radius of arrayOfRadius) {
        res.push(Math.PI * radius * radius);
    }
    return res;
}

function calculateDiameter(arrayOfRadius) {
    const res = [];
    for (const radius of arrayOfRadius) {
        res.push(2 * radius);
    }
    return res;
}

// console.log(calculatePerimeters(arrayOfRadius));
// console.log(calculateAreas(arrayOfRadius));
// console.log(calculateDiameter(arrayOfRadius));

function perimeter(radius) {
    return 2 * Math.PI * radius;
}

function area(radius) {
    return Math.PI * radius * radius;
}

function diameter(radius) {
    return 2 * radius;
}

function squareOfRadius(radius) {
    return radius ** 2;
}

function calculate(arrayOfRadius, logic) {
    const res = [];
    for (const radius of arrayOfRadius) {
        res.push(logic(radius));
    }
    return res;
}

console.log(calculate(arrayOfRadius, perimeter));
// console.log(calculate(arrayOfRadius, area));
// console.log(calculate(arrayOfRadius, diameter));
// console.log(calculate(arrayOfRadius, squareOfRadius));

