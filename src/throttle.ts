function throttle<T extends unknown>(fn: (...args: T[]) => unknown, wait: number) {
  let frameId: null | ReturnType<typeof requestAnimationFrame> = null;
  let lastArgs: T[] = [];
  const throttled = (...args: T[]) => {
    lastArgs = args;

    if (frameId) return;

    frameId = requestAnimationFrame(() => {
      frameId = null;
      fn(...lastArgs);
    });
  };

  throttled.cancel = () => {
    if (!frameId) return;
    cancelAnimationFrame(frameId);
  };

  return throttled;
}

export default throttle;
