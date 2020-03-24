const validation = {
  create:
  {
    object: {
      required: true,
      object: true,
      in: ['body'],
      errorMessage: 'object  is required',
      custom: (reqMethod, req) => {
        if (typeof req[reqMethod] !== 'object') {
          return { error: 'Error Occured', message: 'Not an Object' };
        }
      }
    }
  },
  get: {
  },
};

export default validation;
