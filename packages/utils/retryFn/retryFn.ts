/**
 * This is a function that retries an async function `numRetries` times before throwing an error.
 *
 * @param {Function} asyncFn A function that returns a Promise.
 * @param {number} numRetries Default = 3.
 */
export default async function retryFn<T>(
  asyncFn: () => Promise<T>,
  numRetries: number = 3
): Promise<T> {
  try {
    return await asyncFn();
  } catch (error) {
    if (numRetries > 0) {
      return await retryFn(asyncFn, numRetries - 1);
    } else {
      throw error;
    }
  }
}
