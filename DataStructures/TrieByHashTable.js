class TrieNode {
  constructor(isEnd = false) {
    this.isEnd = isEnd;
    this.children = new Map();
  }

  getChild(char) {
    return this.children.get(char);
  }

  addChild(char, isEnd = false) {
    if (!this.children.has(char)) {
      this.children.set(char, new TrieNode(char, isEnd));
    }

    const childNode = this.children.get(char);

    childNode.isEnd = childNode.isEnd || isEnd;

    return childNode;
  }

  removeChild(char) {
    const childNode = this.getChild(char);

    if (!childNode.isEnd && !childNode.hasChildren()) {
      this.children.delete(char);
    }

    return this;
  }

  hasChild(char) {
    return this.children.has(char);
  }

  hasChildren() {
    return this.children.size !== 0;
  }

  getChildren() {
    return [...this.children.keys()];
  }
}

class Trie {
  constructor() {
    this.head = new TrieNode('*');
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