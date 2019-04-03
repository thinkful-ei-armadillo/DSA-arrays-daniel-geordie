# Arrays notes

Arrays...
* contiguous blocks of memory
* keep a pointer to the first item
* use pointer arithmetic to traverse the array
* indexes are the address for where the data is stored in memory.


## Pointer arithmetic
````js
ptr += 2;
````
Jumps ahead two steps...


## Initializing
* allocate initial memory
* set pointer to first block
````js
arr = [15];
````
[0,0,0,15,0,0,0,0]
[ , , ,ptr, , , , ]

## Pushing
* resize we have space for the new item
* add the value to the end (ptr + length)
* increase the length

````js
arr.push(12);
````
[0,0,0,15,12,0,0,0]
[ , , ,ptr, , , , ]


## Resizing (Naive)
* can't simply increase the size of the allocation
  * there might be stuff using the memory next to the existing allocation
* allocate a new block which is larger

````js
arr.push(12);
````

[0,0,0,15,0,15,12,0]
[ , , ,  , ,ptr, , ]


## Resizing (Sensible)
* allocate more space than we need for us to grow into
* only need to reallocate when we grow larger than that

````js
arr.push(12);
````

[15,0,15,12,0,0,0,0]
[  , ,ptr, , , , , ]


## Retrieving
* use pointer arithmetic
* nth item is at (startPtr + n)

````js
arr[3];
````

[15,0,15,12,8,6,0,0]
[  , ,ptr, , , , , ]


## Popping values
* decrease the length
* don't resize -- the extra space becomes room for us to grow into

````js
arr.pop();
````

[15,0,15,12,8,0,0,0]
[  , ,ptr, , , , , ]


## Inserting
* resize if necessary
* copy all values after the insertion point forward one
* add the new value
* increase the length

````js
arr.splice(1, 0, 32);
````

[15,0,15,32,12,8,0,0]
[  , ,ptr, ,  , , , ]


## Removing
* copy all values after the insertion point back one
* decrease the length

````js
arr.splice(1, 1);
````

[15,0,15,12,8,8,0,0]
[  , ,ptr, , , , , ]


## Today

Morning
* implement an Array class from scratch
* implement the following operations in your array class -- be able to explain the Big O of each operation
  * push
  * pop
  * insert
  * remove

Afternoon
* implement the interview questions
* indentify the Big O of each algorithm you implemented

