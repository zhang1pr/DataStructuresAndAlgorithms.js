function preOrder(root) {
  if (root == null) {
    return;
  }

  console.log(root.val);
  preOrder(root.left);
  preOrder(root.right);
}

function inOrder(root) {
  if (root == null) {
    return;
  }
  
  inOrder(root.left);
  console.log(root.val);
  inOrder(root.right);
}

function postOrder(root) {
  if (root == null) {
    return;
  }
  
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val);
}

// time:  O(n)
// space: O(1)
