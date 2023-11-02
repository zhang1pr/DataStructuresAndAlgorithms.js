function quickSort(array) {
  function sort(p, r) {
    if (p >= r) {
      return;
    }

    const q = partition(p, r);
    sort(p, q - 1);
    sort(q + 1, r);
  }

  function partition(p, r) {
    let pivot = array[r];
    let i = p;
    for (let j = p; j < r; j++) {
      if (array[j] < pivot) {
        [array[i], array[j]] = [array[j], array[i]];
        i++;
      }
    }

    [array[i], array[r]] = [array[r], array[i]];
    return i;
  }

  sort(0, array.length - 1);
}

// time:  O(n^2)
// space: O(1) - in place
// not stable