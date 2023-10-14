class SegmentTree {
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

    this.tree[treePos] = this.operation(this.tree[treePos * 2 + 1], this.tree[treePos * 2 + 2]);
  }

  update(updateIndex, value) {
    this.updateTreeRange(updateIndex, 0, 0, this.array.length - 1, value);
  }

  updateTreeRange(updateIndex, treePos, leftIndex, rightIndex, value) {
    if (leftIndex == rightIndex) {
      this.tree[treePos] = value;
      return;
    }

    const middleUpdateIndex = Math.floor((leftIndex + rightIndex) / 2);

    if (updateIndex <= middleUpdateIndex) {
      this.updateTreeRange(updateIndex, treePos * 2 + 1, leftIndex, middleUpdateIndex, value);
    } else {
      this.updateTreeRange(updateIndex, treePos * 2 + 2, middleUpdateIndex + 1, rightIndex, value);
    }

    this.tree[treePos] = this.operation(this.tree[treePos * 2 + 1], this.tree[treePos * 2 + 2]);
  }

  queryRange(leftQueryIndex, rightQueryIndex) {
    return this.queryTreeRange(leftQueryIndex, rightQueryIndex, 0, 0, this.array.length - 1);
  }

  queryTreeRange(leftQueryIndex, rightQueryIndex, treePos, leftIndex, rightIndex) {
    if (leftQueryIndex <= leftIndex && rightQueryIndex >= rightIndex) {
      return this.tree[treePos];
    }

    if (leftQueryIndex > rightIndex || rightQueryIndex < leftIndex) {
      return this.defaultVal;
    }

    const middleQueryIndex = Math.floor((leftIndex + rightIndex) / 2);

    const leftResult = this.queryTreeRange(leftQueryIndex, rightQueryIndex, treePos * 2 + 1, leftIndex, middleQueryIndex);
    const rightResult = this.queryTreeRange(leftQueryIndex, rightQueryIndex, treePos * 2 + 2, middleQueryIndex + 1, rightIndex);

    return this.operation(leftResult, rightResult);
  }
}