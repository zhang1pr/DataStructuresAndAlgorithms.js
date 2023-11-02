class TrieNode {
  constructor(isEnd = false) {
    this.isEnd = isEnd;
    this.children = Array(26).fill(null);
  }

  getChild(char) {
    return this.children[char.charCodeAt(0) - 97];
  }

  addChild(char, isEnd = false) {
    if (!this.hasChild(char)) {
      this.children[char.charCodeAt(0) - 97] = new TrieNode();
    }

    const childNode = this.getChild(char);

    childNode.isEnd = childNode.isEnd || isEnd;

    return childNode;
  }

  removeChild(char) {
    const childNode = this.getChild(char);

    if (!childNode.isEnd && !childNode.hasChildren()) {
      this.children[char.charCodeAt(0) - 97] = null;
    }

    return this;
  }

  hasChild(char) {
    return this.getChild(char) != null;
  }

  hasChildren() {
    return this.children.filter(Boolean).length > 0;
  }

  getChildren() {
    return this.children
      .map((item, index) => item ? String.fromCharCode(index + 97) : null)
      .filter(Boolean);
  }
}

class Trie {
  constructor() {
    this.head = new TrieNode();
  }

  addWord(word) {
    let currentNode = this.head;

    for (let index = 0; index < word.length; index++) {
      currentNode = currentNode.addChild(word[index], index == word.length - 1);
    }

    return this;
  }

  deleteWord(word) {
    function DFS(currentNode, index) {
      if (index == word.length) {
        return;
      }

      const char = word[index];
      const nextNode = currentNode.getChild(char);

      if (nextNode == null) {
        return;
      }

      DFS(nextNode, index + 1);

      if (index == word.length - 1) {
        nextNode.isEnd = false;
      }

      currentNode.removeChild(char);
    }

    DFS(this.head, 0);

    return this;
  }

  suggestNextCharacters(word) {
    const lastCharacter = this.getLastCharacterNode(word);

    if (!lastCharacter) {
      return null;
    }

    return lastCharacter.getChildren();
  }

  isPresent(word) {
    const lastCharacter = this.getLastCharacterNode(word);

    return lastCharacter != null && lastCharacter.isEnd;
  }

  getLastCharacterNode(word) {
    let currentNode = this.head;

    for (let index = 0; index < word.length; index++) {
      if (!currentNode.hasChild(word[index])) {
        return null;
      }

      currentNode = currentNode.getChild(word[index]);
    }

    return currentNode;
  }
}