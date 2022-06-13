import { format, endOfMonth, isSaturday } from 'date-fns'
import minimist from 'minimist'
const options = minimist(process.argv.slice(2))

const setYearAndMonth = (options) => {
  const nowDate = new Date()
  const year = options.y - 1 || nowDate.getFullYear()
  const month = options.m - 1 || nowDate.getMonth()
  return new Date(year, month)
}

const targetDate = setYearAndMonth(options)
const title = format(targetDate, 'M月 yyyy')
const padStartCount = targetDate.getMonth() > 8 ? 14 : 13
console.log(title.padStart(padStartCount, ' '))
console.log('日 月 火 水 木 金 土')
for (let day = 1; day <= endOfMonth(targetDate).getDate(); day++) {
  if (isSaturday(new Date(targetDate.getFullYear(),targetDate.getMonth(), day))) {
    console.log(day.toString().padStart())
  } else {
    process.stdout.write(day.toString())
  }
}
console.log()
