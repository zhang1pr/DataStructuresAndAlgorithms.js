const Heap = require('../../DataStructures/Heap.js');

const heap = new Heap(10);

for (let i = 1; i <= 10; i++) {
  heap.insert(i);
}

heap.sort();

// time:  O(nlog(n))
// space: O(1) - in place
// not stable
