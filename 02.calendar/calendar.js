import { format, endOfMonth, isSaturday, isSunday } from 'date-fns'
import minimist from 'minimist'
const options = minimist(process.argv.slice(2))

const setYearAndMonth = (options) => {
  const nowDate = new Date()
  const year = options.y - 1 || nowDate.getFullYear()
  const month = options.m - 1 || nowDate.getMonth()
  return new Date(year, month)
}

const target = setYearAndMonth(options)
const title = format(target, 'M月 yyyy')
const padStartCount = target.getMonth() > 8 ? 14 : 13
console.log(title.padStart(padStartCount, ' '))
console.log('日 月 火 水 木 金 土')
for (let day = 1; day <= endOfMonth(target).getDate(); day++) {
  const today = new Date(target.getFullYear(), target.getMonth(), day)
  const dayOfWeek = today.getDay()
  if (day === 1) {
    process.stdout.write('   '.repeat(dayOfWeek) + ' 1')
  } else {
    if (isSunday(today)) {
      process.stdout.write(day.toString().padStart(2, ' '))
    } else {
      process.stdout.write(day.toString().padStart(3, ' '))
    }
  }
  if (isSaturday(today)) console.log()
}
console.log()
