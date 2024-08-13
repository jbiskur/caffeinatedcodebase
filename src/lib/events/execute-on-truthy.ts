type EventMethod<T> = (e: T) => void

/**
 * Executes the specified method when the event is truthy.
 *
 * @template T - The type of the event.
 * @param {EventMethod<T>} method - The method to execute when the event is truthy.
 * @returns {function(e: T): void} - A function that checks if the value of the event is truthy and executes the method if so.
 */
export function executeWhenEventIsTruthy<T>(method: EventMethod<T>): EventMethod<T> {
  return function (e: T) {
    if (!e) {
      return
    }
    method(e)
  }
}
