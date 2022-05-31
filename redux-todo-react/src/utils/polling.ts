export const POLLING_DELAY = 10 * 1000; // in milliseconds

async function poll() {
  // TODO: actually do poll
  console.log("poll!");
}

export function recursivePoll(
  setTimeoutIdDispatch: (id: NodeJS.Timeout) => void,
  clearTimeoutDispatch: () => void
) {
  // clear upcoming timeout of polling if it exists
  clearTimeoutDispatch();

  // set next polling timeout
  const timeoutId = setTimeout(() => {
    // conduct polling and recursively call recursivePoll
    poll();
    recursivePoll(setTimeoutIdDispatch, clearTimeoutDispatch);
  }, POLLING_DELAY);
  setTimeoutIdDispatch(timeoutId);
}
