
const UseDebounce = (fn, delay) => {
  let timer = null;
  return function () {
    const context = this,
      // beware, arrow functions can't use "arguments"
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

export default UseDebounce;
