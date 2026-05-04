// ------------------Slice--------------------

// ---------------Subarrays

const colors = ['red', 'green', 'orange', 'blue', 'purple'];

const colorsCopy = colors.slice();


// -----------indexOf/includes

const index = colors.indexOf('white');

// if (index === -1) {
//     console.log('white doesnt exist');
// }

// --------------- split------

const sentence = 'The brown fox jumps over the white lazy dog';

const words = sentence.split(' ');

// console.log(words.join(' '));

/*

Write a method, to reverse the order of words in a senetence

Input :- sentence = 'The brown fox jumps over the white lazy dog';
Output:- "dog lazy white the over jumps fox brown The"

*/

function reverseWords(sentence) {
    return sentence.split(' ').reverse().join(" ");
}

// console.log(sentence);
// console.log(reverseWords(sentence));


/*

Write a method, to reverse the order of character in each word in a senetence

Input :- sentence = 'The brown fox jumps over the white lazy dog';
Output:- "ehT nworb xof spmuj revo ehe etihw yzal god"

*/

function reverseCharInWords(sentence) {
    const words = sentence.split(' ');
    const res = [];
    for (let word of words) {
        const reversedWord = word.split('').reverse().join("");
        res.push(reversedWord);
    }

    return res.join(" ");
}

console.log(sentence);
console.log(reverseCharInWords(sentence));




