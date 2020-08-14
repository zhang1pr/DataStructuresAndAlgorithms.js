class StackNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class StackBySinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size == 0;
  }

  peek() {
    if (!this.head) {
      return null;
    }

    return this.head.val;
  }

  push(val) {
    this.size++;

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

    this.size--;

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
