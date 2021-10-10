import { quickSort, bubbleSort, defaultSort, selectionSort } from './sortingAlgorithm';

const sortObject = (object: object, sortMethod, startTime): object => {
  const sortedObj = {};
  let keys = Object.keys(object);
  const endTime = new Date().getTime();
  if (endTime - startTime >= 5000)
    return sortedObj;

  switch (sortMethod) {
    case 'quickSort':
      keys = quickSort(keys, 0, keys.length);
      break;
    case 'bubbleSort':
      keys = bubbleSort(keys);
      break;
    case 'selectionSort':
      keys = selectionSort(keys);
      break;
    case 'defaultSort':
      keys = defaultSort(keys);
      break;
    default:
      keys = defaultSort(keys);
  }

  for (const index in keys) {
    if (keys.hasOwnProperty(index)) {
      const key = keys[index];
      if (typeof object[key] === 'object' && !(object[key] instanceof Array)) {
        sortedObj[key] = sortObject(object[key], sortMethod, startTime);
      } else {
        sortedObj[key] = object[key];
      }
    }
  }
  return sortedObj;
};

export default sortObject;
