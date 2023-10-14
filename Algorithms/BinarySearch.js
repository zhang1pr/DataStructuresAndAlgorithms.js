function binarySearchIteration(array, value) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = low + ((high - low) >> 1);

    if (array[mid] == value) {
      return mid;
    } else if (array[mid] < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

function binarySearchRecursion(array, value) {
  function search(array, low, high, value) {
    if (low > high) {
      return -1;
    }

    const mid = low + ((high - low) >> 1);

    if (array[mid] == value) {
      return mid;
    } else if (array[mid] < value) {
      return search(array, mid + 1, high, value);
    } else {
      return search(array, low, mid - 1, value);
    }
  }

  return search(array, 0, array.length - 1, value);
}

function binarySearchFirstDuplicate(array, value) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = low + ((high - low) >> 1);

    if (array[mid] > value) {
      high = mid - 1;
    } else if (array[mid] < value) {
      low = mid + 1;
    } else {
      if (mid == 0 || array[mid - 1] != value) {
        return mid;
      } else {
        high = mid - 1;
      }
    }
  }

  return -1;
}

function binarySearchLastDuplicate(array, value) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = low + ((high - low) >> 1);

    if (array[mid] > value) {
      high = mid - 1;
    } else if (array[mid] < value) {
      low = mid + 1;
    } else {
      if (mid == array.length - 1 || array[mid + 1] != value) {
        return mid;
      } else {
        low = mid + 1;
      }
    }
  }

  return -1;
}

function binarySearchFirstLargerOrEqual(array, value) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = low + ((high - low) >> 1);

    if (array[mid] >= value) {
      if (mid == 0 || array[mid - 1] < value) {
        return mid;
      } else {
        high = mid - 1;
      }
    } else {
      low = mid + 1;
    }
  }

  return -1;
}

function binarySearchLastSmallerOrEqual(array, value) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = low + ((high - low) >> 1);

    if (array[mid] > value) {
      high = mid - 1;
    } else {
      if (mid == array.length - 1 || array[mid + 1] > value) {
        return mid;
      } else {
        low = mid + 1;
      }
    }
  }

  return -1;
}

// time:  O(log(n))/O(n)
// space: O(1)
