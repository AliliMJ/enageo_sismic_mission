const doSomthing = async (x: number): Promise<string> => {
  if (x > 0) return Promise.resolve('Helow');

  return Promise.reject(3);
};
