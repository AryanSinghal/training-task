const validation = {
  insert: {
    sortingAlgorithm: {
      required: true,
      string: true,
      regex: /^[a-zA-Z]+/,
      in: ['body'],
      errorMessage: 'not in quickSort, bubbleSort, selectionSort, defaultSort',
      custom: (key) => {
        const validationArray = ['quickSort', 'bubbleSort', 'selectionSort', 'defaultSort'];
        if (!validationArray.includes(key)) {
          return true;
        }
        return false;
      },
    },
    sortDuration: {
      required: true,
      regex: /[0-9]+$/,
      in: ['body'],
      errorMessage: 'sortDuration is required'
    },
    objectId:
    {
      required: true,
      regex: /[\w]+/,
      in: ['body'],
      errorMessage: 'objectId is required'
    }
  },
  get: {
    objectId: {
      required: true,
      regex: /[\w]+/,
      errorMessage: 'objectId is required',
      in: ['query']
    }
  },
};

export default validation;
