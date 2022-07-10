const CommonDatabase = require('./common_database.js')
const { Select } = require('enquirer')

class CommonMemo {
  constructor () {
    this.db = new CommonDatabase()
  }

  async addNewMemo () {
    const params = await this.#standaerdInput()
    // データをmemoテーブルへ登録する
    // memo [title, contents]
    await this.db.addMemos(params[0], params.slice(1).join('\n'))
    console.log('New memo has been registered.')
  }

  async fetchMemoList () {
    // id毎に昇順でレコードを取得する
    const memos = await this.db.fetchAllRecoredFromMemo()
    if (Object.keys(memos).length === 0) {
      console.log('No memo have been registered.')
    } else {
      memos.forEach(memo => { console.log(memo.title) })
    }
  }

  async referenceMemos () {
    const memos = await this.db.fetchChoiceFormatRecoredFromMemo()
    if (Object.keys(memos).length === 0) {
      console.log('No memo have been registered.')
    } else {
      const id = await this.#choiceMemo(memos, 'Choose a note you want to see:')
      const memo = await this.db.fetchTargetRecoredFromMemo(id)
      console.log(Object.values(memo).join('\n'))
    }
  }

  async deleteMemo () {
    const memos = await this.db.fetchChoiceFormatRecoredFromMemo()
    if (Object.keys(memos).length === 0) {
      console.log('No memo have been registered.')
    } else {
      const id = await this.#choiceMemo(memos, 'Choose a note you want to delete:')
      await this.db.deleteTargetRecoredFromMemo(id)
      console.log('memo removed.')
    }
  }

  #standaerdInput () {
    return new Promise(resolve => {
      process.stdin.resume()
      process.stdin.setEncoding('utf8')
      const lines = []
      const reader = require('readline').createInterface({
        input: process.stdin
      })
      reader.on('line', (line) => {
        lines.push(line)
      })
      reader.on('close', () => {
        resolve(lines)
      })
    })
  }

  #choiceMemo (memos, messageString) {
    return new Promise(resolve => {
      const prompt = new Select({
        message: messageString,
        choices: memos,
        result (name) {
          // nameに対応するvalueを返す
          return this.focused.value
        }
      })
      prompt.run()
        .then(answer => {
          resolve(answer)
        })
    })
  }
}

module.exports = CommonMemo
