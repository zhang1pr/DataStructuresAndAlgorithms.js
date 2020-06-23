class ListNode {
  constructor(val, next = null, prev = null) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(val) {
    const newNode = new ListNode(val, this.head, null);

    if (!this.tail) {
      this.tail = newNode;
      this.head = newNode;
    } else {
      this.head.prev = newNode;
      this.head = newNode;
    }

    return this;
  }

  append(val) {
    const newNode = new ListNode(val, null, this.tail);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  deleteSameFromHead(val) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.val === val) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          this.head = deletedNode.next;

          if (this.head) {
            this.head.prev = null;
          }

          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) {
          this.tail = deletedNode.prev;
          this.tail.next = null;
        } else {
          const prevNode = deletedNode.prev;
          const nextNode = deletedNode.next;

          prevNode.next = nextNode;
          nextNode.prev = prevNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deletedNode;
  }

  deleteSameFromTail(val) {
    if (!this.tail) {
      return null;
    }

    let deletedNode = null;
    let currentNode = this.tail;

    while (currentNode) {
      if (currentNode.val === val) {
        deletedNode = currentNode;

        if (deletedNode === this.tail) {
          this.tail = deletedNode.prev;

          if (this.tail) {
            this.tail.next = null;
          }

          if (deletedNode === this.head) {
            this.head = null;
          }
        } else if (deletedNode === this.head) {
          this.head = deletedNode.next;
          this.head.prev = null;
        } else {
          const prevNode = deletedNode.prev;
          const nextNode = deletedNode.next;

          prevNode.next = nextNode;
          nextNode.prev = prevNode;
        }
      }

      currentNode = currentNode.prev;
    }

    return deletedNode;
  }

  findFromHead(val, callback) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (callback && callback(currentNode)) {
        return currentNode;
      }

      if (currentNode.val == val) {
        return currentNode;
      }
      
      currentNode = currentNode.next;
    }

    return null;
  }

  findFromTail(val, callback) {
    if (!this.tail) {
      return null;
    }

    let currentNode = this.tail;

    while (currentNode) {
      if (callback && callback(currentNode)) {
        return currentNode;
      }

      if (currentNode.val == val) {
        return currentNode;
      }
      
      currentNode = currentNode.prev;
    }

    return null;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head === this.tail) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    return deletedTail;
  }

  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;
 
    while (currNode) {
      nextNode = currNode.next;
      prevNode = currNode.prev;

      currNode.next = prevNode;
      currNode.prev = nextNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  traverseFromHead() {
    let currentNode = this.head;

    while (currentNode) {
      console.log(currentNode.val);
      currentNode = currentNode.next;
    }
  }

  traverseFromTail() {
    let currentNode = this.tail;

    while (currentNode) {
      console.log(currentNode.val);
      currentNode = currentNode.prev;
    }
  }
}
