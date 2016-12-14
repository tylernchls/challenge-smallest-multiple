'use strict';

/**
 * Build a function that finds the smallest positive number that is evenly
 * divisible by all of the numbers starting from 1 up to the value passed into your function.
 *
 * @param  { Number } ceiling This value will serve as your ceiling.
 * @return { Number }         Lowest Positive Number that is evenly divisible by all numbers
 *                            between 1 and `ceiling`
 */
module.exports = ( ceiling ) => {
  if (isNumber(ceiling)) {
    if (ceiling <= 0) {
      throw new Error('Parameter in function must be greater than zero');
    }
    if (!isInteger(ceiling)) {
      throw new Error('Parameter in function must be a positive integer');
    }

    // Observing that lcm(a,b,c) ≡ lcm(lcm(a,b),c)
    let a = 1;
    for (let i = 1; i <= ceiling; i++) {
      a = lcm(a, i);
    }
    return a;
  }
};

const isNumber = (value) => {
  return (value instanceof Number) || (typeof value == 'number');
};

const isInteger = (value) => {
  return (value === Math.round(value));
};

const gcd = (a, b) => {
  if (isNumber(a) && isNumber(b)) {
    if (!isInteger(a) || !isInteger(b)) {
      throw new Error('Parameters in function gcd must be integer numbers');
    }

    // http://en.wikipedia.org/wiki/Euclidean_algorithm
    let r;
    while (b != 0) {
      r = a % b;
      a = b;
      b = r;
    }
    return (a < 0) ? -a : a;
  }
};

const lcm = (a, b) => {
  // lcm is defined as:
  // lcm(a, b) = abs(a * b) / gcd(a, b)
  if (isNumber(a) && isNumber(b)) {
    if (!isInteger(a) || !isInteger(b)) {
      throw new Error('Parameters in function lcm must be integer numbers');
    }
    return (Math.abs(a) / gcd(a, b)) * Math.abs(b);
  }
};