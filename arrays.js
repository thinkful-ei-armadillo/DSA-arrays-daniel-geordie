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
  // remove from array
  arr.pop();
  arr.pop();
  arr.pop();
  // clear array and insert 'tauhida'
  arr.pop();
  arr.pop();
  arr.insert(0, 'tauhida');

  console.log(arr);
  console.log(memory.get(3));
}

main();

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
const test2 = 'httsp://thinkful.com/ tau hida par veen'
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
  for(let i = 0; i < array.length; i++) {
    if(array[i] < filterKey) {
      console.log(`filering at ${i}`);
      array.slice(i, i+1);
    }
  }
  return array;
}

console.log(myFilter([1,2,3,4,5,6,1,2,3,5,2,8,4,5,10], 5));