class TreeNode {
  constructor(val = null) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  get leftHeight() {
    if (!this.left) {
      return 0;
    }

    return this.left.height + 1;
  }

  get rightHeight() {
    if (!this.right) {
      return 0;
    }

    return this.right.height + 1;
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }
  
  get uncle() {
    if (!this.parent || !this.parent.parent || !this.parent.parent.left || !this.parent.parent.right) {
      return null;
    }

    if (this.parent == this.parent.parent.left) {
      return this.parent.parent.right;
    }

    return this.parent.parent.left;
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

class AVlTree {
  constructor() {
    this.root = new TreeNode();
  }

  insert(val) {
    const node = this.root.insert(val);

    let currentNode = this.root.find(val);

    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }

    return node;
  }

  contains(val) {
    return this.root.contains(val);
  }

  remove(val) {
    const node = this.root.remove(val);

    this.balance(this.root);

    return node;
  }

  balance(node) {
    if (node.balanceFactor > 1) {
      if (node.left.balanceFactor > 0) {
        this.rotateLeftLeft(node);
      } else if (node.left.balanceFactor < 0) {
        this.rotateLeftRight(node);
      }
    } else if (node.balanceFactor < -1) {
      if (node.right.balanceFactor < 0) {
        this.rotateRightRight(node);
      } else if (node.right.balanceFactor > 0) {
        this.rotateRightLeft(node);
      }
    }
  }

  rotateLeftLeft(rootNode) {
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode);
    } else if (rootNode === this.root) {
      this.root = leftNode;
    }

    if (leftNode.right) {
      rootNode.setLeft(leftNode.right);
    }

    leftNode.setRight(rootNode);
  }

  rotateLeftRight(rootNode) {
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    const leftRightNode = leftNode.right;
    leftNode.setRight(null);

    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left);
      leftRightNode.setLeft(null);
    }

    rootNode.setLeft(leftRightNode);

    leftRightNode.setLeft(leftNode);

    this.rotateLeftLeft(rootNode);
  }

  rotateRightLeft(rootNode) {
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    const rightLeftNode = rightNode.left;
    rightNode.setLeft(null);

    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right);
      rightLeftNode.setRight(null);
    }

    rootNode.setRight(rightLeftNode);

    rightLeftNode.setRight(rightNode);

    this.rotateRightRight(rootNode);
  }

  rotateRightRight(rootNode) {
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode);
    } else if (rootNode === this.root) {
      this.root = rightNode;
    }

    if (rightNode.left) {
      rootNode.setRight(rightNode.left);
    }

    rightNode.setLeft(rootNode);
  }
}
