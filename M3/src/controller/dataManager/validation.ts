const validation = {
  createObject: {
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
    }
  },
  list: {
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
  listSortStats: {
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
    },
    objectId: {
      required: true,
      regex: /[\w]+/,
      errorMessage: 'objectId is required',
      in: ['query']
    },
  },
  sortObject: {
    objectId: {
      required: true,
      regex: /[\w]+/,
      errorMessage: 'objectId is required',
      in: ['body']
    },
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
      }
    }
  },
  sortAllObject: {
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
      }
    }
  }
};

export default validation;
