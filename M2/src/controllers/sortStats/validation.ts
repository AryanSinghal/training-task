const validation = {
  create:
  {
    object: {
      required: true,
      object: true,
      in: ['body'],
      errorMessage: 'object  is required',
      custom: (key) => {
        console.log(key);
        if (typeof key !== 'object') {
          return { error: 'Error Occurred', message: 'Not an Object' };
        }
      }
    },
    sortingAlgorithm: {
      required: true,
      string: true,
      regex: /^[a-zA-Z]+/,
      in: ['body'],
      errorMessage: 'object  is required',
      custom: (key) => {
        console.log(key);
        const validationArray = ['quickSort', 'bubbleSort', 'selectionSort', 'defaultSort'];
        if (! validationArray.includes(key)) {
          return { error: 'Error Occurred', message: 'Not an Object' };
        }
      }
    }

  }
};

export default validation;
