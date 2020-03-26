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
  sortObject: {
    objectId: {
      required: true,
      regex: /[\w]+/,
      errorMessage: 'objectId is required',
      in: ['body']
    },
    object: {
      required: true,
      object: true,
      in: ['body'],
      errorMessage: 'object  is required',
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
      custom: (req, reqMethod) => {
        const validationArray = ['quickSort', 'bubbleSort', 'selectionSort', 'defaultSort'];
        if (!validationArray.includes(req[reqMethod].sortingAlgorithm)) {
          return true;
        }
        return false;
      }
    }
  },
};

export default validation;
