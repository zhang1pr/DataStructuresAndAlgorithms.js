const Heap = require('../../DataStructures/Heap');

function HeapSort(array) {
  const heap = new Heap(array);
  
  heap.buildHeap();

  return heap.array;
}

// time:  O(nlog(n))
// space: O(1) - in place
// not stable
