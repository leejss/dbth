function debounce<T extends unknown>(fn: (...args: T[]) => unknown, wait: number) {
  let timerId: null | ReturnType<typeof setTimeout> = null;
  let lastArgs: T[] = [];

  // Cancel timer
  const cancel = () => {
    timerId && clearTimeout(timerId);
    timerId = null;
  };

  const debounced = (...args: T[]) => {
    lastArgs = args;
    timerId && cancel();

    // Set a new timer
    timerId = setTimeout(() => {
      timerId = null;
      fn(...lastArgs);
    }, wait);
  };

  debounced.cancel = cancel;
  return debounced;
}

export default debounce;
