class SegmentTree {
  constructor(array, operation, defaultVal) {
    this.array = array;
    this.operation = operation;
    this.defaultVal = defaultVal || 0;

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

    return Array(treeLength);
  }

  buildTree(leftIndex, rightIndex, treePos) {
    if (leftIndex == rightIndex) {
      this.tree[treePos] = this.array[leftIndex];
      return;
    }

    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    this.buildTree(leftIndex, middleIndex, treePos * 2 + 1);
    this.buildTree(middleIndex + 1, rightIndex, treePos * 2 + 2);

    this.tree[treePos] = this.operation(this.tree[treePos * 2 + 1], this.tree[treePos * 2 + 2]);
  }

  update(arrayIndex, value) {
    this.updateTreeRange(0, 0, this.array.length - 1, arrayIndex, value);
  }

  updateTreeRange(treePos, leftIndex, rightIndex, arrayIndex, value) {
    if (leftIndex == rightIndex) {
      this.tree[treePos] = value;
    } else {
      const middleIndex = Math.floor((leftIndex + rightIndex) / 2);

      if (arrayIndex <= middleIndex) {
        this.updateTreeRange(treePos * 2 + 1, leftIndex, middleIndex, arrayIndex, value);
      } else {
        this.updateTreeRange(treePos * 2 + 2, middleIndex + 1, rightIndex, arrayIndex, value);
      }

      this.tree[treePos] = this.operation(this.tree[treePos * 2 + 1], this.tree[treePos * 2 + 2]);
    }
  }

  query(queryIndex) {
    return this.queryRange(0, queryIndex);
  }

  queryRange(queryLeftIndex, queryRightIndex) {
    return this.queryTreeRange(queryLeftIndex, queryRightIndex, 0, this.array.length - 1, 0);
  }

  queryTreeRange(queryLeftIndex, queryRightIndex, leftIndex, rightIndex, treePos) {
    if (queryLeftIndex <= leftIndex && queryRightIndex >= rightIndex) {
      return this.tree[treePos];
    }

    if (queryLeftIndex > rightIndex || queryRightIndex < leftIndex) {
      return this.defaultVal;
    }

    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);

    const leftResult = this.queryTreeRange(queryLeftIndex, queryRightIndex, leftIndex, middleIndex, treePos * 2 + 1);
    const rightResult = this.queryTreeRange(queryLeftIndex, queryRightIndex, middleIndex + 1, rightIndex, treePos * 2 + 2);

    return this.operation(leftResult, rightResult);
  }
}
