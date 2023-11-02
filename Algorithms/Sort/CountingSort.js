function countingSort(array) {
  if (array.length <= 1) {
    return;
  }

  let max = array[0];
  for (const item of array) {
    max = Math.max(max, item);
  }

  const count = new Array(max + 1).fill(0);

  for (const item of array) {
    count[item]++;
  }

  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  const reverse = new Array(array.length);
  for (let i = array.length - 1; i >= 0; i--) {
    const index = count[array[i]] - 1;
    reverse[index] = array[i];
    count[array[i]]--;
  }

  for (let i = 0; i < array.length; i++) {
    array[i] = reverse[i];
  }
}

// time:  O(n)
// space: O(n+k) - not in place
// stable