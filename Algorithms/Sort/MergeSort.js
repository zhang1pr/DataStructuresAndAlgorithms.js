function mergeSort(array) {
  function split(p, r) {
    if (p >= r) {
      return;
    }

    const q = (p + r) >>> 1;
    split(p, q);
    split(q + 1, r);
    merge(p, q, r);
  }

  function merge(p, q, r) {
    let i = p;
    let j = q + 1;
    let k = 0;
    let tmp = new Array(r - p + 1);
    while (i <= q && j <= r) {
      if (array[i] <= array[j]) {
        tmp[k] = array[i];
        i++;
      } else {
        tmp[k] = array[j];
        j++;
      }

      k++;
    }

    let start = i;
    let end = q;
    if (j <= r) {
      start = j;
      end = r;
    }

    while (start <= end) {
      tmp[k] = array[start];
      k++;
      start++;
    }

    for (i = 0; i <= r - p; i++) {
      array[p + i] = tmp[i];
    }
  }

  split(0, array.length - 1);
}

// time:  O(nlog(n))
// space: O(n) - not in place
// stable