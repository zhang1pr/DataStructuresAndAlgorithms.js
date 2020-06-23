const SinglyLinkedList = require('./SinglyLinkedList');

class HashTable {
  constructor(size = 32) {
    this.size = size;
    this.buckets = new Array(size).fill(null).map(() => new SinglyLinkedList());

    this.keys = {};
  }

  hash(key) {
    const hash = [...key].reduce((sum, char) => (sum + char.charCodeAt(0)), 0);

    return hash % this.size;
  }

  set(key, val) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
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
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find(null, node => node.val.key === key);

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find(null, node => node.val.key === key);

    if (node) {
      return node.val.val;
    } else {
      return undefined;
    }
  }

  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }

  getValues() {
    return Object.values(this.keys);
  }

  getEntries() {
    return Object.entries(this.keys);
  }
}
