class StackByArray {
  constructor(capacity) {
    this.items = Array(capacity);
    this.capacity = capacity;
    this.count = 0;
  }

  push(item) {
    if (this.count == this.capacity) {
      return false;
    }

    this.items[this.count] = item;
    this.count++;
    return true;
  }

  pop() {
    if (this.count == 0) {
      return null;
    }

    const result = this.items[this.count - 1];
    this.count--;
    return result;
  }
}
