function partition(keys, left, right) {
    const pivot = keys[Math.floor((right + left) / 2)];
    let  temp;
    let i = left;
    let j = right;
    while (i <= j) {
      while (keys[i] < pivot) {
        i++;
      }
      while (keys[j] > pivot) {
        j--;
      }
      if (i <= j) {
        temp = keys[j];
        keys[j] = keys[i];
        keys[i] = temp;
        i++;
        j--;
      }
    }
    return i;
  }

function quickSort(keys, left, right) {
    let index;
    if (keys.length > 1) {
      index = partition(keys, left, right);
      if (left < index - 1) {
        quickSort(keys, left, index - 1);
      }
      if (index < right) {
        quickSort(keys, index, right);
      }
    }
    return keys;
  }

export default quickSort;
