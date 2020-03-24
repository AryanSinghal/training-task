function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomNumber(length) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomBoolean() {
  const bool = [true, false];
  return bool[getRandomInt(2)];
}

const getObject = (rootKeyCount, maxDepth) => {
  let rootKey = 0;
  let object = {};
  while (rootKey < rootKeyCount) {
    const max = (maxDepth > 0) ? 5 : 4;
    const key = getRandomString(20);
    switch (getRandomInt(max)) {
      case 0:
        object = { ...object, [key]: getRandomNumber(getRandomInt(20)) };
        break;
      case 1:
        object = { ...object, [key]: getRandomString(20) };
        break;
      case 2:
        object = { ...object, [key]: getRandomBoolean() };
        break;
      case 3:
        object = { ...object, [key]: [] };
        break;
      case 4:
        object = { ...object, [key]: getObject(Math.floor(rootKeyCount / 2), maxDepth - 1) };
        break;
      default:
        break;
    }
    rootKey++;
  }
  return object;
};

export default getObject;
