declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAround(a: number, precision?: number): R;
    }
  }
}

export {};
