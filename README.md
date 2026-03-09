1️⃣ What is the difference between var, let, and const?

>>>  var ekta old style variable. Eta function er moddhe thakle oi function er bahire kaj kore na.  
let ekdom new style, eta block scope follow kore. Mane { } er moddhe thakle bahire kaj kore na.
const o block scope, kintu ekbar value assign korle change kora jabe na. Constant rakhar jonno use hoy.

2️⃣ What is the spread operator (...)?
>>>  The ... operator lets you expand an array or object into individual elements.
It’s very useful for copying arrays or merging them.
Example:

let arr1 = [1,2,3];
let arr2 = [...arr1, 4,5]; // arr2 = [1,2,3,4,5]


3️⃣ What is the difference between map(), filter(), and forEach()?

>>> 
=> map() → loops through an array and creates a new array with modified elements.

=> filter() → loops through an array and creates a new array containing only elements that meet a condition.

=> forEach() → loops through an array but does not return a new array, just runs code for each element.

Example:

let numbers = [1,2,3];
numbers.map(n => n*2); // [2,4,6]
numbers.filter(n => n>1); // [2,3]
numbers.forEach(n => console.log(n)); // just prints 1,2,3


4️⃣ What is an arrow function?

>>> Arrow functions are a shorter and cleaner way to write functions in JavaScript (introduced in ES6).
They are easy to read and write.

const sum = (a,b) => a+b;
console.log(sum(2,3)); // 5

They also handle this differently compared to normal functions.


5️⃣ What are template literals?
>>> Template literals are a way to write strings easily, especially when you need variables inside strings.
They use backticks (`) instead of quotes.

let name = "Mimi";
console.log(`My name is ${name}`);

You can also create multi-line strings without using \n.
It’s much cleaner than concatenating strings with +.