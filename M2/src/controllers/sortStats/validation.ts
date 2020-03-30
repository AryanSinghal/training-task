const validation = {
  create:
  {
    object: {
      required: true,
      object: true,
      in: ['body'],
      errorMessage: 'should be object',
      custom: (reqMethod, req) => {
        if (typeof req[reqMethod].object !== 'object') {
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
      custom: (reqMethod, req) => {
        const validationArray = ['quickSort', 'bubbleSort', 'selectionSort', 'defaultSort'];
        console.log(!validationArray.includes(req[reqMethod].sortingAlgorithm));
        if (!validationArray.includes(req[reqMethod].sortingAlgorithm)) {
          return true;
        }
        return false;
      }
    }
  }
};

export default validation;
