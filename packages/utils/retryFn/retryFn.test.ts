import retryFn from "./retryFn";

describe("retryFn util function", () => {
  const asyncFn = jest.fn();

  afterEach(() => {
    asyncFn.mockRestore();
  });

  it("should return a successful result on the first retry", async () => {
    asyncFn.mockImplementationOnce(() => Promise.reject("error")); // first call
    asyncFn.mockImplementationOnce(() => Promise.resolve("success")); // first retry

    const res = await retryFn(asyncFn);

    expect(asyncFn.mock.calls).toHaveLength(2); // first call + first retry
    expect(res).toBe("success");
  });

  it("should return a successful result on the second retry", async () => {
    asyncFn
      .mockImplementationOnce(() => Promise.reject("error"))
      .mockImplementationOnce(() => Promise.reject("error"))
      .mockImplementationOnce(() => Promise.resolve("success"));

    const res = await retryFn(asyncFn);

    expect(asyncFn.mock.calls).toHaveLength(3);
    expect(res).toBe("success");
  });

  it("should return a successful result on the third retry", async () => {
    asyncFn
      .mockImplementationOnce(() => Promise.reject("error"))
      .mockImplementationOnce(() => Promise.reject("error"))
      .mockImplementationOnce(() => Promise.reject("error"))
      .mockImplementationOnce(() => Promise.resolve("success"));

    const res = await retryFn(asyncFn);

    expect(asyncFn.mock.calls).toHaveLength(4);
    expect(res).toBe("success");
  });

  it("should throw an error after the third retry", async () => {
    asyncFn.mockImplementation(() => Promise.reject("error"));

    try {
      await retryFn(asyncFn);
    } catch (error) {
      expect(asyncFn.mock.calls).toHaveLength(4);
      expect(error).toBe("error");
    }
  });

  it("should throw an error after the given number of retries", async () => {
    asyncFn.mockImplementation(() => Promise.reject("error"));

    try {
      await retryFn(asyncFn, 2);
    } catch (error) {
      expect(asyncFn.mock.calls).toHaveLength(3);
      expect(error).toBe("error");
    }
  });
});
