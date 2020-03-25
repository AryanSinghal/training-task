const validation = {
  create:
  {
    object: {
      required: true,
      object: true,
      in: ['body'],
      errorMessage: 'object  is required',
      custom: (key) => {
        if (typeof key !== 'object') {
          return true;
        }
        return false;
      }
    },
    sortingAlgorithm: {
      required: true,
      string: true,
      regex: /^[a-zA-Z]+/,
      in: ['body'],
      errorMessage: 'not in quickSort, bubbleSort, selectionSort, defaultSort',
      custom: (key) => {
        const validationArray = ['quickSort', 'bubbleSort', 'selectionSort', 'defaultSort'];
        if (! validationArray.includes(key)) {
          return true;
        }
        return false;
      }
    }

  }
};

export default validation;
