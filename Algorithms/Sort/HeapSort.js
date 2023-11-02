const StaticHeap = require('../../DataStructures/Heap.js');

function HeapSort(array) {
  return new StaticHeap(array).sort();
}

// time:  O(nlog(n))
// space: O(1) - in place
// not stable