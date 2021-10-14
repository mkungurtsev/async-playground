module.exports = function (Homework) {
  // вспомогательные фукнции и т.д.

  const promisify = (func, ...props) =>
    new Promise((resolve) => {
      func(...props, (result) => {
        resolve(result);
      });
    });

  return async (array, fn, initialValue, cb) => {
    // асинхронный reduce

    if (!array instanceof Homework.AsyncArray) {
      throw new Error("not AsyncArray");
    }

    if (typeof fn !== "function") {
      throw new Error("fn not set");
    }

    if (typeof cb !== "function") {
      throw new Error("cb not set");
    }

    const length = await promisify(array.length);
    let result = initialValue;

    for (
      let i = 0;
      await promisify(Homework.less, i, length);
      i = await promisify(Homework.add, i, 1)
    ) {
      const curr = await promisify(array.get, i);
      result = await promisify(fn, result, curr, i, array);
    }

    cb(result);
  };
};
