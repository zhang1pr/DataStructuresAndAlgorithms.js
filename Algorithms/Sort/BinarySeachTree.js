class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  find(data) {
    let p = this.tree;
    
    while (p != null) {
      if (data < p.data) {
        p = p.left;
      } else if (data > p.data) {
        p = p.right;
      } else {
        return p;
      }
    }
    
    return null;
  }

  insert(data) {
    if (this.tree == null) {
      this.tree = new Node(data);
      return;
    }

    let p = this.tree;

    while (p != null) {
      if (data > p.data) {
        if (p.right == null) {
          p.right = new Node(data);
          return;
        }
        p = p.right;
      } else {
        if (p.left == null) {
          p.left = new Node(data);
          return;
        }
        p = p.left;
      }
    }
  }


  delete(data) {
    let p = this.tree;
    let pp = null;
    while (p != null && p.data != data) {
      pp = p;
      if (data > p.data) {
        p = p.right;
      } else {
        p = p.left;
      }
    }
    
    if (p == null) {
      return;
    }

    if (p.left != null && p.right != null) {
      minP = p.right;
      minPP = p;

      while (minP.left != null) {
        minPP = minP;
        minP = minP.left;
      }

      p.data = minP.data;
      p = minP;
      pp = minPP;
    }

    let child;
    if (p.left != null) {
      child = p.left;
    } else if (p.right != null) {
      child = p.right;
    } else {
      child = null;
    }

    if (pp == null) {
      this.tree = child;
    } else if (pp.left == p) {
      pp.left = child;
    } else {
      pp.right = child;
    }
  }
}

// time:  O(log(n))/O(nlog(n))
// space: O(1)/O(n)
