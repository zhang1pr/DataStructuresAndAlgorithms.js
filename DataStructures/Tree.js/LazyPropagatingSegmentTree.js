class LazyPropagatingSegmentTree {
  constructor(array, operation, defaultVal) {
    this.array = array;
    this.operation = operation;
    this.defaultVal = defaultVal || 0;

    this.tree = this.createTree(this.array);

    this.buildTree(0, 0, this.array.length - 1);
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

  buildTree(treePos, leftIndex, rightIndex) {
    if (leftIndex == rightIndex) {
      this.tree[treePos] = this.array[leftIndex];
      return;
    }

    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    this.buildTree(treePos * 2 + 1, leftIndex, middleIndex);
    this.buildTree(treePos * 2 + 2, middleIndex + 1, rightIndex);

    this.tree[treePos] = 0;
  }

  updateRange(leftUpdateIndex, rightUpdateIndex, value) {
    this.updateTreeRange(leftUpdateIndex, rightUpdateIndex, 0, 0, this.array.length - 1, value)
  }

  updateTreeRange(leftUpdateIndex, rightUpdateIndex, treePos, leftIndex, rightIndex, value) {
    if (leftUpdateIndex > rightIndex || rightUpdateIndex < leftIndex) {
      return;
    }

    if (leftUpdateIndex <= leftIndex && rightUpdateIndex >= rightIndex) {
      this.tree[treePos] = this.operation(this.tree[treePos], value);
      return;
    }

    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);

    this.updateTreeRange(leftUpdateIndex, rightUpdateIndex, treePos * 2 + 1, leftIndex, middleIndex, value);
    this.updateTreeRange(leftUpdateIndex, rightUpdateIndex, treePos * 2 + 2, middleIndex + 1, rightIndex, value);
  }

  query(queryIndex) {
    return this.queryTreeRange(queryIndex, 0, 0, this.array.length - 1);
  }

  queryTreeRange(queryIndex, treePos, leftIndex, rightIndex) {
    if (queryIndex > rightIndex || queryIndex < leftIndex) {
      return this.defaultVal;
    }

    if (leftIndex == rightIndex) {
      return this.tree[treePos];
    }

    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);

    let result;

    if (queryIndex <= middleIndex) {
      result = this.queryTreeRange(queryIndex, treePos * 2 + 1, leftIndex, middleIndex);
    } else {
      result = this.queryTreeRange(queryIndex, treePos * 2 + 2, middleIndex + 1, rightIndex);
    }

    return this.operation(result, this.tree[treePos])
  }
}