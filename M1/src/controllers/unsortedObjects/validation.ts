const validation = {
  create:
      {
      rootKeyCount:
      {
          required: true,
          regex: /[0-9]+$/,
          in: ['body'],
          errorMessage: 'rootKeyCount  is required',
      },
      maxDepth:
      {
          required: true,
          regex: /[0-9]+$/,
          in: ['body'],
          errorMessage: 'maxDepth is required'
      },
    },
    get: {
    },
};

export default validation;
