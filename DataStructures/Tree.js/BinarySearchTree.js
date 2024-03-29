class BSTNode {
  constructor(parent, k) {
    this.key = k;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  find(k) {
    if (k == this.key) return this;

    if (k < this.key) {
      if (this.left) {
        return this.left.find(k);
      } else {
        return null;
      }
    } else {
      if (this.right) {
        return this.right.find(k);
      } else {
        return null;
      }
    }
  }

  findMin() {
    let cur = this;

    while (cur.left) {
      cur = cur.left;
    }

    return cur;
  }

  findMax() {
    let cur = this;

    while (cur.right) {
      cur = cur.right;
    }

    return cur;
  }

  nextLarger() {
    if (this.right)
      return this.right.findMin();

    let cur = this;

    while (cur.parent && cur == cur.parent.right) {
      cur = cur.parent;
    }

    if (cur.parent) {
      return cur.parent;
    } else {
      return null;
    }
  }

  lastSmaller() {
    if (this.left)
      return this.left.findMax();

    let cur = this;

    while (cur.parent && cur == cur.parent.left) {
      cur = cur.parent;
    }

    if (cur.parent) {
      return cur.parent;
    } else {
      return null;
    }
  }

  insert(node) {
    if (node == null) return;

    if (node.key < this.key) {
      if (this.left) {
        this.left.insert(node);
      } else {
        node.parent = this;
        this.left = node;
      }
    } else {
      if (this.right) {
        this.right.insert(node);
      } else {
        node.parent = this;
        this.right = node;
      }
    }
  }

  delete() {
    if (!this.left || !this.right) {
      if (this == this.parent.left) {
        this.parent.left = this.left || this.right;

        if (this.parent.left) {
          this.parent.left.parent = this.parent;
        }
      } else {
        this.parent.right = this.left || this.right;

        if (this.parent.right) {
          this.parent.right.parent = this.parent;
        }
      }

      return this;
    } else {
      let s = this.nextLarger();
      [this.key, s.key] = [s.key, this.key];
      return s.delete();
    }
  }

  findAtLeast(k) {
    let cur = this;
    let ans = null;

    while (cur) {
      if (cur.key == k) {
        return cur;
      } else if (cur.key < k) {
        cur = cur.right;
      } else if (cur.key > k) {
        ans = cur;
        cur = cur.left;
      }
    }

    return ans;
  }

  findAtMost(k) {
    let cur = this;
    let ans = null;

    while (cur) {
      if (cur.key == k) {
        return cur;
      } else if (cur.key < k) {
        ans = cur;
        cur = cur.right;
      } else if (cur.key > k) {
        cur = cur.left;
      }
    }

    return ans;
  }
}

class MinBSTNode extends BSTNode {
  findMin() {
    return this.min;
  }

  insert(node) {
    if (node == null) return;

    if (node.key < this.key) {
      if (node.key < this.min.key) {
        this.min = node;

        if (this.left == null) {
          node.parent = this;
          this.left = node;
        } else {
          this.left.insert(node);
        }
      }
    } else {
      if (this.right == null) {
        node.parent = this;
        this.right = node;
      } else {
        this.right.insert(node);
      }
    }
  }

  delete() {
    if (this.left == null || this.right == null) {
      if (this == this.parent.left) {
        this.parent.left = this.left || this.right;

        if (this.parent.left != null) {
          this.parent.left.parent = this.parent;
          this.parent.min = this.parent.left.min;
        } else {
          this.parent.min = this.parent;
          let cur = this.parent;

          while (cur.parent != null && cur == cur.parent.left) {
            cur.parent.min = cur.min;
            cur = cur.parent;
          }
        }
      } else {
        this.parent.right = this.left || this.right;

        if (this.parent.right != null) {
          this.parent.right.parent = this.parent;
        }
      }
      return this;
    } else {
      const s = this.nextLarger();
      [this.key, s.key] = [s.key, this.key];
      return s.delete();
    }
  }
}

class BinarySearchTree {
  constructor(isAugmented = false) {
    this.root = null;
    this.TreeNode = isAugmented ? MinBSTNode : BSTNode;
  }

  find(k) {
    return this.root && this.root.find(k);
  }

  findMin() {
    return this.root && this.root.findMin();
  }

  findMax() {
    return this.root && this.root.findMax();
  }

  nextLarger(k) {
    const node = this.find(k);
    return node && node.nextLarger();
  }

  lastSmaller(k) {
    const node = this.find(k);
    return node && node.lastSmaller();
  }

  insert(k) {
    const node = new this.TreeNode(null, k);

    if (this.root == null) {
      this.root = node;
    } else {
      this.root.insert(node);
    }

    return node;
  }

  delete(k) {
    const node = this.find(k);
    if (node == null) return null;

    if (node == this.root) {
      const pseudoroot = new this.TreeNode(null, 0);
      pseudoroot.left = this.root;
      this.root.parent = pseudoroot;

      const deleted = this.root.delete();
      this.root = pseudoroot.left;

      if (this.root) {
        this.root.parent = null;
      }

      return deleted;
    } else {
      return node.delete();
    }
  }

  findAtLeast(k) {
    if (this.root == null) return null;
    return this.root.findAtLeast(k);
  }

  findAtMost(k) {
    if (this.root == null) return null;
    return this.root.findAtMost(k);
  }

  deleteAtLeast(k) {
    const node = this.findAtLeast(k);

    if (node) {
      return this.delete(node.key);
    }

    return null;
  }

  deleteAtMost(k) {
    const node = this.findAtMost(k);

    if (node) {
      return this.delete(node.key);
    }

    return null;
  }
}