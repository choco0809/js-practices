const commander = require('commander')
const CommonMemo = require('./common_memo.js')

commander
  .option('-l, --list')
  .option('-r, --reference ')
  .option('-d, --delete')

commander.parse()
const options = commander.opts()
const memo = new CommonMemo()

if (Object.keys(options).length === 0) {
  memo.addNewMemo()
} else if (options.list) {
  memo.fetchMemoList()
} else if (options.reference) {
  memo.referenceMemos()
} else if (options.delete) {
  memo.deleteMemo()
}
