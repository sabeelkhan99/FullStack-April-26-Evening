
const nums = [1, 2, 3, 4, [100, 200], 5, 6];

const numsCopy = [...nums];

const obj = {
    name: 'Max',
    age: 25,
    address: {
        city: 'New Delhi',
        country: 'India'
    }
}

const objCopy = { ...obj };

// const objCopy2 = Object.assign({}, obj);

// console.log(objCopy2);

// ----------------------------------Deep Copies------------

const objJsonString = JSON.stringify(obj);

const objDeepCopy = JSON.parse(objJsonString);

const objDeepClone = structuredClone(obj);

