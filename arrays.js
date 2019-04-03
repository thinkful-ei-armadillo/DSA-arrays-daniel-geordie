'use strict';
const Memory = require('./memory');

let memory = new Memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }

}

function main(){

  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  // // remove from array
  arr.pop();
  arr.pop();
  arr.pop();
  // // clear array and insert 'tauhida'
  arr.pop();
  arr.pop();
  arr.insert(0, 'tauhida');

  console.log(arr);
  console.log(memory.get(3));
}

// main();

// 2. Array { length: 1, _capacity: 3, ptr: 0 }
// after series of pushes -- Array { length: 6, _capacity: 12, ptr: 3 }
// length is 6, capacity is 12, and the pointer is at 3...
// array looks like this.. [0,0,0,3,5,15,19,45,10,0,0,0]

// 3. Array { length: 3, _capacity: 12, ptr: 3 }
// length is now 3, capacity is 12, and pointer remains at 3...
// rray looks like this.. [0,0,0,3,5,15,0,0,0,0,0,0]

// 4. Array { length: 3, _capacity: 12, ptr: 3 }
// first item is 3
// removed all indices of data and inserted 'tauhida'
// when printed with console.log(memory.get(3)), we get NaN because strings are not numbers
// _resize() recalibrates the this.ptr value whenever the array gets re-sized to for a new data point or one is removed.

//5. urlify
const test = 'tauhida parveen';
const test2 = 'httsp://thinkful.com/ tau hida par veen';
function urlify(string) {
  let array = string.split('');
  for(let i = 0; i < array.length; i++) {
    if(array[i] === ' '){
      array[i] = '%20';
    }
  }
  return array.join('');
}

// console.log(urlify(test2));
//this is a pretty linear complexitiy O(n). It cannot be more efficient as it is dependant on string length

//6. filter method
function myFilter(array, filterKey) {
  let result = [];
  for(let i = 0; i < array.length; i++) {
    if(array[i] > filterKey) {
      console.log(`filering at ${i}`);
      result.push(array[i]);
    }
  }
  return result;
}
// console.log(myFilter([1,2,3,4,5,6,1,2,3,5,2,8,4,5,10], 5));

// linear complexity - depends on the length of the input due to a single for loop run through its contents. O(n)

// 7. max sum

const sumThis = [4, 6, -3, 5, -2, 1];

function maxSum(arr) {
  let result = 0;
  for (let i = 0; i < arr.length-1; i++) {
    if (arr[i] + arr[i+1] > result) {
      result = (arr[i] + arr[i+1]);
    }
    if (arr[i] + arr[i+1] + arr[i+2] > result) {
      result = (arr[i] + arr[i+1] + arr[i+2]);
    }
    if (arr[i] + arr[i+1] + arr[i+2] + arr[i+3] > result) {
      result = (arr[i] + arr[i+1] + arr[i+2] + arr[i+3]);
    }
  }
  return result;
}

// console.log(maxSum(sumThis));
// linear complexity - depends on the length of the input due to a single for loop run through its contents. O(n)

// 8. merge arrays

const array1 = [1, 3, 6, 8, 11];
const array2 = [2, 3, 5, 8, 9, 10];

function mergeMe(arr1, arr2) {
  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i]);
  }
  for (let i = 0; i < arr2.length; i++) {
    result.push(arr2[i]);
  }
  return result.sort();
}

// console.log(mergeMe(array1, array2));
// this function has two separate for loops dependent on the length of two separate inputs -- meaning that it has
// polynomial complexity. O(n^k)
// if may be able to be improved by using a single length definition and pushing individual values at a time based
// on their integer value against each from the other array at a given index -- using just one for loop, making it O(n).

// 9. remove chars

const text = 'Battle of the Vowels: Hawaii vs. Grozny';
const key = 'aeiou';

function removeThis(str, bye) {
  let arrResult = [];
  let strResult = '';
  for (let i = 0; i < str.length; i++) {
    arrResult.push(str[i]);
  }
  for (let i = 0; i < arrResult.length; i++) {
    for (let j = 0; j < bye.length; j++) {
      if (arrResult[i] === bye[j]) {
        arrResult[i] = '';
      }
    }
  }
  for (let i = 0; i < arrResult.length; i++) {
    strResult += arrResult[i];
  }
  return strResult;
}
// console.log(removeThis(text, key));

// this function has three top level for loops, and one nested for loop. the runtime on this function won't be excellent, but
// it works! it avoids use of filter, split, and join as requested. it has a complexity of O(2n + n^k)

// 10. products
//Given an array of numbers, write an algorithm to find out the products of every other number except the number at each index.
const input = [1, 3, 9, 4];

function prods(arr) {
  let result = [];
  let mult = 1;
  for (let i = 0; i < arr.length; i++) {
    mult *= arr[i];
  }
  for (let i = 0; i < arr.length; i++) {
    result.push(mult/arr[i]);
  }
  return result;
}

// console.log(prods(input));

// this function has a complexity of O(n) - it is linear as it only depends on the length of a single input

// 11. 2D array
// Write an algorithm which searches through a 2D array, and whenever it finds a 0 should set the entire row and column to 0.
let inputArr = [[1,0,1,1,0],
[0,1,1,1,0],
[1,1,1,1,1],
[1,0,1,1,1],
[1,1,1,1,1]];

//we had to inject inputArr into the function because when we set resultArr to arr, it was mutating the original arr as well

function makeZero(arr) {
  let resultArr = inputArr.map(line => line.slice(0));
  let idx = [];
  // rows
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 0) {
        idx.push(j);
        resultArr[i] = [0,0,0,0,0];
      }
    }
  }console.log(idx);
  //columns
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      for (let k = 0; k < idx.length; k++) {
        if (j === idx[k]) {
          resultArr[i][j] = 0;
        }
      }
    }
  }
  console.log(arr);
  return resultArr;
}

console.log(makeZero(inputArr));

// 12. string rotation
//amazon
function stringRotation(str1, str2) {
  let placeholder = str2;
  for (let i =0; i < str1.length; i++){
    if(placeholder === str1){
      return true;
    } else {
      placeholder = placeholder.slice(1) + placeholder.charAt(0);
    }
  }
  return false;
}

// console.log(stringRotation('amazon', 'zonama'));
// console.log(stringRotation('amazon', 'mzaona'));