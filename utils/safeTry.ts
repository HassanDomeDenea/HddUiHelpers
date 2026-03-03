export const safeTry = async <TResponse, TError = unknown>(fn: () => Promise<TResponse>): Promise<[TResponse, undefined] | [undefined, TError]> => {
  try {
    const data = await fn();
    return [data, undefined];
  } catch (e) {
    return [undefined, e as TError];
  }
};

export const safeRequest = async <TResponse, TError = unknown>(
  fn: () => Promise<{
    data: TResponse;
  }>,
): Promise<[TResponse, undefined] | [undefined, TError]> => {
  try {
    const data = (await fn()).data;
    return [data, undefined];
  } catch (e) {
    return [undefined, e as TError];
  }
};
