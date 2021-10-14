module.exports = function (Homework) {
  const promisify = (func) => (...args) =>
    new Promise((resolve) => func(...args, resolve));
  const isLesser = promisify(Homework.less);
  const add = promisify(Homework.add);

  return async (array, fn, initialValue, cb) => {
    const getLength = promisify(array.length);
    const getValue = promisify(array.get);
    const compute = promisify(fn);

    const length = await getLength();
    let result = initialValue;

    for (let i = 0; await isLesser(i, length); i = await add(i, 1)) {
      const curr = await getValue(i);
      result = await compute(result, curr, i, array);
    }

    cb(result);
  };
};
