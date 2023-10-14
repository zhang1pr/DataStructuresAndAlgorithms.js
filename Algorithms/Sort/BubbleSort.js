function bubbleSort(array) {
  if (array.length <= 1) {
    return;
  }

  for (let i = 0; i < array.length; i++) {
    let flag = false;

    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        flag = true;
      }
    }

    if (!flag) {
      break;
    }
  }
}

// time:  O(n^2)
// space: O(1) - in place
// stable
