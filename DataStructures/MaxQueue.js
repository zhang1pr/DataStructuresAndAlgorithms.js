class Node {
  constructor(val, next = null, prev = null) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
  }
   
  isEmpty() {
    return this.head == null;  
  }  
   
  enqueue(val) {
    const newNode = new Node(val, null, this.tail);

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

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    return deletedHead.val;
  }
    
  addHead(val) {
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

    return deletedTail.val;
  }
    
  peekTail() {
    return this.tail ? this.tail.val : null;
  }  
  
  peekHead() {
    return this.head ? this.head.val : null;
  }    
}

class MaxQueue {
  constructor() {
    this.deque = new Deque(); 
  } 
    
  enqueue(val) {
    let count = 1;
    while (!this.deque.isEmpty() && val > this.deque.peekTail()[0]) {
      const item = this.deque.deleteTail();
      count += item[1];  
    } 
     
    this.deque.enqueue([val, count]);  
  }

  dequeue() {
     if (this.deque.isEmpty()) return null;

     this.deque.peekHead()[1]--;
      
     if (this.deque.peekHead()[1] == 0) {
        this.deque.dequeue();
     }
  }  
    
  isEmpty() {
    return this.deque.isEmpty();  
  } 
  
  getMax() {
    return !this.deque.isEmpty() ? this.deque.peekHead()[0] : null;
  }  
}
