'use strict'
const co = require('co')
const sqlite3 = require('co-sqlite3')
const uuid = require('node-uuid')

const useDb = fn => co(function*(){
	const db = yield sqlite3(`${__dirname}/../data/db.db`)
  try {
		console.log("running", fn.toString())
		return yield fn(db)
  } catch(err) {
    console.log(err)
    throw err
  } finally {
    db.close()
  }
})

useDb(co.wrap(function*(db){
  const tableExists = yield db.get(`SELECT 1 yes FROM sqlite_master WHERE type='table' AND name LIKE 'notes' LIMIT 1`, [])
  if(tableExists && tableExists[0]  && tableExists[0].yes)
    return
  yield db.run("CREATE TABLE notes (id UUID primary key, name TEXT, message TEXT)", [])
}))

const add = note => useDb(db =>
	db.run(`
		INSERT INTO notes(id, name, message) VALUES
		('${uuid.v1()}', '${note.name}', '${note.message}')
	`)
)
const all = () => useDb(db =>
	db.all(`
		SELECT n.id, n.name, n.message
		FROM notes n
	`)
)

module.exports = { add, all }
