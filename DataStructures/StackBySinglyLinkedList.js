class StackNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  isEmpty() {
    return !this.head;
  }

  peek() {
    if (!this.head) {
      return null;
    }

    return this.head.val;
  }

  push(val) {
    const newNode = new StackNode(val, this.head);

    if (!this.tail) {
      this.tail = newNode;
      this.head = newNode;
    } else {
      this.head = newNode;
    }

    return this;
  }

  pop() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead.val;
  }
}
