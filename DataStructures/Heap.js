class Heap {
  constructor(capacity) {
    this.array = new Array(capacity + 1);
    this.array[0] = null;
    this.capacity = capacity;
    this.count = 0;
  }

  insert(data) {
    if (this.count >= this.capacity) {
      return;
    }
    
    this.count++;
    this.array[this.count] = data;
    
    let i = this.count;
    while (Math.floor(i/2) > 0 && this.array[i] > this.array[Math.floor(i/2)]) {
      [this.array[i], this.array[Math.floor(i/2)]] = [this.array[Math.floor(i/2)], this.array[i]];
      i = Math.floor(i/2);
    }
  }

  removeMax() {
    if (this.count == 0) {
      return -1;
    }
    
    a[1] = a[this.count];
    this.count--;
    heapify(1);
  }

  heapify(i) {
    while (true) {
      let maxPos = i;
      if (i*2 <= this.count && this.array[i] < this.array[i*2]) {
        maxPos = i*2;
      }
      
      if (i*2 + 1 <= this.count && this.array[maxPos] < this.array[i*2 + 1]) {
        maxPos = i*2 + 1;
      }
      
      if (maxPos === i) {
        break;
      }
      
      [this.array[i], this.array[maxPos]] = [this.array[maxPos], this.array[i]];
      i = maxPos;
    }
  }

  buildHeap(n) {
    for (let i = n/2; i >= 1; i--) {
      this.heapify(i);
    }
  }

  sort() {
    this.buildHeap(this.capacity);
    
    let i = Math.floor(this.capacity);
    while (i > 1) {
      [this.array[i], this.array[1]] = [this.array[1], this.array[i]];
      i--;
      this.count--;
      this.heapify(1);
    }
  }
}

module.exports = Heap;
