const sqlite3 = require('sqlite3')

class CommonDatabase {
  constructor () {
    this.db = new sqlite3.Database('./memo.db')
  }

  addMemos (title, contents) {
    return new Promise(resolve => {
      this.db.serialize(() => {
        this.db.run('create table if not exists memo(id INTEGER PRIMARY KEY AUTOINCREMENT,title,contents)')
        this.db.run('insert into memo(title,contents) values(?,?)', title, contents)
      })
      resolve()
    })
  }

  fetchAllRecoredFromMemo () {
    return new Promise(resolve => {
      this.db.all('select * from memo order by id', (error, row) => {
        if (error) { console.error(error) }
        resolve(row)
      })
    })
  }

  fetchChoiceFormatRecoredFromMemo () {
    return new Promise(resolve => {
      this.db.all('select title as name, id as value from memo order by id', (error, row) => {
        if (error) { console.error(error) }
        resolve(row)
      })
    })
  }

  fetchTargetRecoredFromMemo (targetId) {
    return new Promise(resolve => {
      this.db.get('select title,contents from memo where id = ? ', targetId, (error, row) => {
        if (error) { console.error(error) }
        resolve(row)
      })
    })
  }

  deleteTargetRecoredFromMemo (targetId) {
    return new Promise(resolve => {
      this.db.run('delete from memo where id = ?', targetId)
      resolve()
    })
  }
}

module.exports = CommonDatabase
