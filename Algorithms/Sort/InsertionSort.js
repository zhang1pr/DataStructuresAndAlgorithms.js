function insertionSort(array) {
  if (array.length <= 1) {
    return;
  }

  for (let i = 1; i < array.length; i++) {
    const temp = array[i];

    let j;
    for (j = i - 1; j >= 0; j--) {
      if (array[j] > temp) {
        array[j + 1] = array[j];
      } else {
        break;
      }
    }

    array[j + 1] = temp;
  }
}

// time:  O(n^2)
// space: O(1) - in place
// stable