module.exports = function (Homework) {
  // вспомогательные фукнции и т.д.

  function promisify(func) {
    return function (...args) {
      return new Promise((resolve) => {
        func(...args, resolve);
      });
    };
  }

  return (array, fn, initialValue, cb) => {
    // асинхронный reduce
    const getLength = promisify(array.length);
    const isLesser = promisify(Homework.less);
    const getValue = promisify(array.get);
    const compute = promisify(fn);
    const add = promisify(Homework.add);

    async function run() {
      const length = await getLength();
      let result = initialValue;
      let i = 0;

      while (await isLesser(i, length)) {
        const curr = await getValue(i);
        result = await compute(result, curr, i, array);
        i = await add(i, 1);
      }

      return result;
    }

    run().then(cb);
  };
};
