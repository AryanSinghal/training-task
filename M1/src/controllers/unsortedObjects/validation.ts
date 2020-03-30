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
    skip:
    {
      required: false,
      default: 0,
      number: true,
      regex: /[0-9]+/,
      in: ['query'],
      errorMessage: 'Skip is invalid',
      custom: (reqMethod, req): void => {
        if (req[reqMethod].skip === undefined) {
          req[reqMethod].skip = 0;
        }
      }
    },
    limit:
    {
      required: false,
      default: 10,
      number: true,
      regex: /[0-9]+/,
      in: ['query'],
      errorMessage: 'Limit is invalid',
      custom: (reqMethod, req): void => {
        if (req[reqMethod].limit === undefined) {
          req[reqMethod].limit = 10;
        }
      }
    }
  },
  getObject: {
    id: {
      required: true,
      string: true,
      regex: /[\w]+/,
      errorMessage: 'id is required',
      in: ['params']
    }
  }
};

export default validation;
