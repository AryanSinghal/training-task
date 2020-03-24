const bubbleSort = (keys) => {
  const len = keys.length;
  let temp;
  for (let i = 0; i < len; i++) {
    for (let j = 0, stop = len - i; j < stop; j++) {
      if (keys[j] > keys[j + 1]) {
        temp = keys[j];
        keys[j] = keys[j + 1];
        keys[j + 1] = temp;
      }
    }
  }
  return keys;
};

export default bubbleSort;
