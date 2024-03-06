import retryFn from "./retryFn";

describe("retryFn util function", () => {
  const asyncFn = jest.fn();

  afterEach(() => {
    asyncFn.mockRestore();
  });

  it("should return a successful result on the first attempt", async () => {
    asyncFn.mockImplementationOnce(() => Promise.resolve("success"));

    const res = await retryFn(asyncFn);

    expect(asyncFn.mock.calls).toHaveLength(1);
    expect(res).toBe("success");
  });

  it("should return a successful result on the second attempt", async () => {
    asyncFn
      .mockImplementationOnce(() => Promise.reject("error"))
      .mockImplementationOnce(() => Promise.resolve("success"));

    const res = await retryFn(asyncFn);

    expect(asyncFn.mock.calls).toHaveLength(2);
    expect(res).toBe("success");
  });

  it("should return a successful result on the third attempt", async () => {
    asyncFn
      .mockImplementationOnce(() => Promise.reject("error"))
      .mockImplementationOnce(() => Promise.reject("error"))
      .mockImplementationOnce(() => Promise.resolve("success"));

    const res = await retryFn(asyncFn);

    expect(asyncFn.mock.calls).toHaveLength(3);
    expect(res).toBe("success");
  });

  it("should throw an error after the third attempt", async () => {
    asyncFn.mockImplementation(() => Promise.reject("error"));

    try {
      await retryFn(asyncFn);
    } catch (error) {
      expect(asyncFn.mock.calls).toHaveLength(3);
      expect(error).toBe("error");
    }
  });

  it("should throw an error after the given number of retries", async () => {
    asyncFn.mockImplementation(() => Promise.reject("error"));

    try {
      await retryFn(asyncFn, 2);
    } catch (error) {
      expect(asyncFn.mock.calls).toHaveLength(2);
      expect(error).toBe("error");
    }
  });
});
