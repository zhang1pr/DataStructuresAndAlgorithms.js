class SegmentTree {
  constructor(array, operation, defaultVal) {
    this.array = array;
    this.operation = operation;
    this.defaultVal = defaultVal;

    this.tree = this.createTree(this.array);

    this.buildTree(0, this.array.length - 1, 0);
  }

  isPowerOfTwo(num) {
    if (num < 1) {
      return false;
    }

    return (num & (num - 1)) == 0;
  }

  createTree(array) {
    let treeLength;
    const arrayLength = array.length;

    if (this.isPowerOfTwo(arrayLength)) {
      treeLength = 2 * arrayLength - 1;
    } else {
      const nextPower = 2 ** (Math.floor(Math.log2(arrayLength)) + 1);
      treeLength = 2 * nextPower - 1;
    }

    return Array(treeLength).fill(null);
  }

  buildTree(leftIndex, rightIndex, position) {
    if (leftIndex == rightIndex) {
      this.tree[position] = this.array[leftIndex];
      return;
    }

    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    this.buildTree(leftIndex, middleIndex, position * 2 + 1);
    this.buildTree(middleIndex + 1, rightIndex, position * 2 + 2);

    this.tree[position] = this.operation(this.tree[position * 2 + 1], this.tree[position * 2 + 2]);
  }

  rangeQuery(leftIndex, rightIndex) {
    return this.query(leftIndex, rightIndex, 0, this.array.length - 1, 0);
  }

  query(queryLeftIndex, queryRightIndex, leftIndex, rightIndex, position) {
    if (queryLeftIndex <= leftIndex && queryRightIndex >= rightIndex) {
      return this.tree[position];
    }

    if (queryLeftIndex > rightIndex || queryRightIndex < leftIndex) {
      return this.defaultVal;
    }

    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);

    const leftResult = this.query(queryLeftIndex, queryRightIndex, leftIndex, middleIndex, position * 2 + 1);
    const rightResult = this.query(queryLeftIndex, queryRightIndex, middleIndex + 1, rightIndex, position * 2 + 2);

    return this.operation(leftResult, rightResult);
  }
}
