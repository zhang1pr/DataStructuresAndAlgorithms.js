class BinaryIndexedTree {
  constructor(size) {
    this.size = size;
    this.array = Array(this.size + 1).fill(0);
  }

  increase(position, value) {
    for (let i = position; i <= this.size; i += (i & -i)) {
      this.array[i] += value;
    }

    return this;
  }

  query(position) {
    let sum = 0;

    for (let i = position; i > 0; i -= (i & -i)) {
      sum += this.array[i];
    }

    return sum;
  }

  queryRange(leftIndex, rightIndex) {
    if (leftIndex == 1) {
      return this.query(rightIndex);
    }

    return this.query(rightIndex) - this.query(leftIndex - 1);
  }
}
