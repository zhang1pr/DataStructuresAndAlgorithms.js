const Heap = require('../../DataStructures/Heap');

function HeapSort(array) {
  const heap = new Heap()
  
  while (array.length) {
    heap.add(array.pop());
  }
  
  while (!heap.isEmpty()) {
    array.push(heap.poll());
  }

  return array;
}

// time:  O(nlog(n))
// space: O(1)
// not stable
