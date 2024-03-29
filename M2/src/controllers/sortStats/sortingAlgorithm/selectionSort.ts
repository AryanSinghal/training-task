const selectionSort = (arr) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
      let min = i;
      for (let j = i + 1; j < len; j++) {
          if (arr[min] > arr[j]) {
              min = j;
          }
      }
      if (min !== i) {
          const tmp = arr[i];
          arr[i] = arr[min];
          arr[min] = tmp;
      }
  }
  return arr;
};

export default selectionSort;
