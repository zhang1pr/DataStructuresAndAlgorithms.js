class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }  
}

class QueueBySinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.sz = 0;
  }

  isEmpty() {
    return this.head == null;
  }

  size() {
    return this.sz;
  }

  peek() {
    return this.head;   
  }  
    
  enqueue(val) {
    const newNode = new ListNode(val);
    this.sz++;

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

    this.sz--;

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }
}
