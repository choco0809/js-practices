const fizzbuzz = require('./fizzbuzz')

test('number 3 to equal Fizz', () => {
  expect(fizzbuzz(3)).toBe('Fizz')
})

test('number 5 to equal Buzz', () => {
  expect(fizzbuzz(5)).toBe('Buzz')
})

test('number 15 to equal FizzBuzz', () => {
  expect(fizzbuzz(15)).toBe('FizzBuzz')
})

test('number 1 to equal 1', () => {
  expect(fizzbuzz(1)).toBe(1)
})
