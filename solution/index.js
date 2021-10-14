module.exports = function (Homework) {
  // вспомогательные фукнции и т.д.

  const promisify = (func) => new Promise((resolve) => func(resolve));

  return async (array, fn, initialValue, cb) => {
    // асинхронный reduce
    const length = await promisify(array.length);
    let result = initialValue;
    let i = 0;

    while (await promisify((resolve) => Homework.less(i, length, resolve))) {
      const curr = await promisify((resolve) => array.get(i, resolve));
      result = await promisify((resolve) =>
        fn(result, curr, i, array, resolve)
      );
      i = await promisify((resolve) => Homework.add(i, 1, resolve));
    }

    cb(result);
  };
};
