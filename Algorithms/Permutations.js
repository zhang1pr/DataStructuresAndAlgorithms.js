function permutations(array) {
  const result = [];

  function permute(array, k) {
    if (k == 1) {
      result.push(array.slice());
    }

    for (let i = 0; i < k; i++) {
      [array[i], array[k - 1]] = [array[k - 1], array[i]]

      permute(array, k - 1);

      [array[i], array[k - 1]] = [array[k - 1], array[i]]
    }
  }

  permute(array, array.length);

  return result;
}

// time:  O(n!)
// space: O(1)
