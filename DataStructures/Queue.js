class Queue {
  constructor(capacity) {
    this.items = [...new Array(capacity)];
    this.capacity = capacity;
    this.head = 0;
    this.tail = 0;
  }

  enqueue(item) {
    if ((this.tail + 1) % this.capacity == this.head) {
      return false;
    }

    this.items[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    return true;
  }

  dequeue() {
    if (this.head == this.tail) {
      return null;
    }

    const result = this.items[this.head];
    this.head = (this.head + 1) % this.capacity;
    return result;
  }
}

const queue = new Queue(3);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();
queue.enqueue(3);
queue.dequeue();
queue.dequeue();
queue.dequeue();
