class TreeNode {
  constructor(val = null) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  setLeft(node) {
    if (this.left) {
      this.left.parent = null;
    }

    this.left = node;

    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  setRight(node) {
    if (this.right) {
      this.right.parent = null;
    }

    this.right = node;

    if (node) {
      this.right.parent = this;
    }

    return this;
  }

  findMin() {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }
  
  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.left == nodeToReplace) {
      this.left = replacementNode;
      return true;
    }

    if (this.right && this.right == nodeToReplace) {
      this.right = replacementNode;
      return true;
    }

    return false;
  }

  insert(val) {
    if (this.val == null) {
      this.val = val;

      return this;
    }

    if (val < this.val) {
      if (this.left) {
        return this.left.insert(val);
      }

      const newNode = new TreeNode(val);
      this.setLeft(newNode);

      return newNode;
    }

    if (val > this.val) {
      if (this.right) {
        return this.right.insert(val);
      }

      const newNode = new TreeNode(val, this.compareFunction);
      this.setRight(newNode);

      return newNode;
    }

    return this;
  }

  find(val) {
    if (this.val == val) {
      return this;
    }

    if (val < this.val && this.left) {
      return this.left.find(val);
    }

    if (val > this.val && this.right) {
      return this.right.find(val);
    }

    return null;
  }

  contains(val) {
    return this.find(val) != null;
  }

  remove(val) {
    const nodeToRemove = this.find(val);

    if (!nodeToRemove) {
      return false;
    }

    const parent = nodeToRemove.parent;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        parent.removeChild(nodeToRemove);
      } else {
        nodeToRemove.val = null;
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (nextBiggerNode == nodeToRemove.right) {
        this.remove(nextBiggerNode.val);
        nodeToRemove.val = nextBiggerNode.val;
      } else {
        nodeToRemove.val = nodeToRemove.right.val;
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        childNode.val = nodeToRemove.val;
        childNode.setLeft(sourceNode.left);
        childNode.setRight(sourceNode.right);
      }
    }

    nodeToRemove.parent = null;

    return true;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = new TreeNode();
  }

  insert(val) {
    return this.root.insert(val);
  }

  contains(val) {
    return this.root.contains(val);
  }

  remove(val) {
    return this.root.remove(val);
  }
}
