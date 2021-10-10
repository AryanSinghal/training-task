const validation = {
  insert: {
    sortingAlgorithm: {
      required: true,
      string: true,
      regex: /^[a-zA-Z]+/,
      in: ['body'],
      errorMessage: 'not in quickSort, bubbleSort, selectionSort, defaultSort',
      custom: (reqMethod, req) => {
        const validationArray = ['quickSort', 'bubbleSort', 'selectionSort', 'defaultSort'];
        if (!validationArray.includes(req[reqMethod].sortingAlgorithm)) {
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
  getStats: {
    objectId: {
      required: true,
      regex: /[\w]+/,
      errorMessage: 'objectId is required',
      in: ['query']
    },
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
  getAll: {
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
  insertAll: {
    data: {
      required: true,
      object: true,
      in: ['body'],
      errorMessage: 'should be array',
      custom: (reqMethod, req) => {
        if (!Array.isArray(req[reqMethod].data)) {
          return true;
        }
        return false;
      }
    }
  }
};

export default validation;
