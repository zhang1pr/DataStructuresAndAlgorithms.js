class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(val) {
    const newNode = new ListNode(val, this.head);

    if (!this.tail) {
      this.tail = newNode;
      this.head = newNode;
    } else {
      this.head = newNode;
    }

    return this;
  }

  append(val) {
    const newNode = new ListNode(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  deleteSame(val) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    while (this.head && this.head.val === val) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode != null) {
      while (currentNode.next) {
        if (currentNode.next.val === val) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail.val === val) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  find(val, callback) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (callback && callback(currentNode)) {
        return currentNode;
      }

      if (currentNode.val === val) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteHead() {
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

    return deletedHead;
  }

  deleteTail() {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  reverse() {
    let currentNode = this.head;
    let previousNode = null;
    let nextNode = null;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = previousNode;

      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = previousNode;

    return this;
  }

  traverse() {
    let currentNode = this.head;

    while (currentNode) {
      console.log(currentNode.val);
      currentNode = currentNode.next;
    }
  }

  reverseTraverseByRecursion() {
    function helper(node) {
      if (node) {
        helper(node.next);
        console.log(node.val);
      }
    }

    helper(this.head);
  }

  reverseTraverseByStack() {
    const stack = [];

    let currentNode = this.head;

    while (currentNode) {
      stack.push(currentNode.val);
      currentNode = currentNode.next;
    }

    while (stack.length) {
      console.log(stack.pop());
    }
  }
}

module.exports = SinglyLinkedList;