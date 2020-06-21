class QueueNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class QueueBySinglyLinkedList {
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

  enqueue(val) {
    const newNode = new QueueNode(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  dequeue() {
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
