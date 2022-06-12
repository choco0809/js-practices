const maxNumber = 30

const fizzbuzz = (number) => {
  if (number % 15 === 0) return 'FizzBuzz'
  if (number % 3 === 0) return 'Fizz'
  if (number % 5 === 0) return 'Buzz'
  return number
}

for (let number = 1; number <= maxNumber; number++) {
  console.log(fizzbuzz(number))
}

module.exports = fizzbuzz
