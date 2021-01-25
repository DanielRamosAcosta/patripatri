// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

export const toBeAround = function (actual, expected, precision = 2) {
  const pass = Math.abs(expected - actual) < Math.pow(10, -precision) / 2;
  if (pass) {
    return {
      message: () => `expected ${actual} not to be around ${expected}`,
      pass: true,
    };
  } else {
    return {
      message: () => `expected ${actual} to be around ${expected}`,
      pass: false,
    };
  }
};

expect.extend({ toBeAround });
