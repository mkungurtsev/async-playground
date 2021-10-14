module.exports = function (Homework) {
  // вспомогательные фукнции и т.д.

  const promisify = (func) =>
    new Promise((resolve) => {
      func((result) => {
        resolve(result);
      });
    });

  return async (array, fn, initialValue, cb) => {
    // асинхронный reduce
    const length = await promisify(array.length);
    let result = initialValue;
    let i = 0;

    while (await promisify(Homework.less.bind(null, i, length))) {
      const curr = await promisify(array.get.bind(null, i));
      result = await promisify(fn.bind(null, result, curr, i, array));
      i = await promisify(Homework.add.bind(null, i, 1));
    }

    cb(result);
  };
};
