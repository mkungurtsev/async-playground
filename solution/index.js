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

    if (!array instanceof Homework.AsyncArray) {
      throw new Error("not AsyncArray");
    }

    const fnSet = await promisify(
      Homework.equal.bind(null, typeof fn, "function")
    );
    if (!fnSet) {
      throw new Error("fn not set");
    }

    const cbSet = await promisify(
      Homework.equal.bind(null, typeof cb, "function")
    );
    if (!cbSet) {
      throw new Error("cb not set");
    }

    const length = await promisify(array.length);
    let result = initialValue;

    for (
      let i = 0;
      await promisify(Homework.less.bind(null, i, length));
      i = await promisify(Homework.add.bind(null, i, 1))
    ) {
      const curr = await promisify(array.get.bind(null, i));
      result = await promisify(fn.bind(null, result, curr, i, array));
    }

    cb(result);
  };
};
