class TreeNode {
  constructor(parent, k) {
    this.key = k
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  find(k) {
    if (k == this.key) return this
    
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

  nextLarger() {
    if (this.right) 
      return this.right.findMin()
   
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

  insert(node) {
    if (node == null) return;

    if (node.key < this.key) {
      if (this.left) {
        this.left.insert(node)
      } else {
        node.parent = this
        this.left = node
      }
    } else {
      if (this.right) {
        this.right.insert(node)
      } else {
        node.parent = this
        this.right = node
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

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  find(k) {
    return this.root && this.root.find(k);
  }

  findMin() {
    return this.root && this.root.findMin();
  }
      
  insert(k) {
    const node = new TreeNode(null, k);

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
      const pseudoroot = new TreeNode(null, 0);
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

  nextLarger(k) {
    const node = this.find(k);
    return node && node.nextLarger();    
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
