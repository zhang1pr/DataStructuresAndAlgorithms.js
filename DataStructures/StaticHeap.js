class StaticHeap {
  constructor(array = []) {
    this.array = array;
    this.capacity = array.length;
  }

  heapifyUp(childIndex) {
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while (parentIndex >= 0 && !this.checkInvariant(this.array[parentIndex], this.array[childIndex])) {
      [this.array[parentIndex], this.array[childIndex]] = [this.array[childIndex], this.array[parentIndex]];
      childIndex = parentIndex;
      parentIndex = Math.floor((parentIndex - 1) / 2);
    }
  }

  heapifyDown(parentIndex) {
    let childIndex1 = parentIndex * 2 + 1;
    let childIndex2 = parentIndex * 2 + 2;
    let nextIndex;

    while (childIndex1 < this.capacity) {
      if (childIndex2 < this.capacity && this.checkInvariant(this.array[childIndex2], this.array[childIndex1])) {
        nextIndex = childIndex2;
      } else {
        nextIndex = childIndex1;
      }

      if (this.checkInvariant(this.array[parentIndex], this.array[nextIndex])) {
        break;
      }

      [this.array[parentIndex], this.array[nextIndex]] = [this.array[nextIndex], this.array[parentIndex]];
      parentIndex = nextIndex;
      childIndex1 = nextIndex * 2 + 1;
      childIndex2 = nextIndex * 2 + 2;
    }
  }

  checkInvariant(a, b) {
    return a >= b;
  }

  buildHeap(capacity) {
    for (let index = Math.floor((capacity - 1) / 2); index >= 0; index--) {
      this.heapifyDown(index);
    }
  }

  sort() {
    this.buildHeap(this.capacity);

    let index = this.capacity - 1;
    while (index > 0) {
      [this.array[index], this.array[0]] = [this.array[0], this.array[index]];
      index--;
      this.capacity--;
      this.heapifyDown(0);
    }

    return this.array;
  }
}

module.exports = StaticHeap;
