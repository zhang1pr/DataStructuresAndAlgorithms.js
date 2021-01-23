const SinglyLinkedList = require('./SinglyLinkedList');

class HashTable {
  constructor(size = 32) {
    this.size = size;
    this.buckets = [...Array(size)].map(() => new SinglyLinkedList());
  }

  hash(key) {
    const hash = [...key].reduce((sum, char) => (sum + char.charCodeAt(0)), 0);

    return hash % this.size;
  }

  set(key, val) {
    const keyHash = this.hash(key);
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find(null, node => node.val.key === key);

    if (!node) {
      bucketLinkedList.append({key, val});
    } else {
      node.val.val = val;
    }

    return this;
  }

  delete(key) {
    const keyHash = this.hash(key);
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find(null, node => node.val.key === key);

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  get(key) {
    const keyHash = this.hash(key);
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find(null, node => node.val.key === key);

    if (node) {
      return node.val.val;
    } else {
      return undefined;
    }
  }

  has(key) {
    const keyHash = this.hash(key);
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find(null, node => node.val.key === key);

    return node != null;
  }
}
