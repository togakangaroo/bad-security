'use strict'

const co = require('co')
const sqlite3 = require('co-sqlite3')
const uuid = require('node-uuid')

const runIt = (dbLocation) =>  {
  dbLocation || (dbLocation = `${__dirname}/../data/db.db`)

  return co(function*(){
    const db = yield sqlite3(dbLocation);
    try {
      const tableExists = yield db.get(`SELECT 1 yes FROM sqlite_master WHERE type='table' AND name LIKE 'products' LIMIT 1`, [])
      if(tableExists && tableExists[0]  && tableExists[0].yes)
        return
      yield db.run("CREATE TABLE producs (id UUID primary key, name TEXT)", [])
      // var stmt = yield db.prepare('INSERT INTO testtable(id) VALUES( ? )');
      // for(var i =0 ; i < 100 ; i++){
      //   yield stmt.run(i);
      // }
      //
      // stmt.finalize();
      //
      // var row = yield db.get('SELECT * FROM testtable WHERE id < ? ORDER BY ID DESC ' ,[50]);
      // console.log(row); // {id: 49}
      //
      // var rows = yield db.all('SELECT * FROM testtable');
      // console.log(rows.length);

      const stmt = yield db.prepare("INSERT INTO products VALUES (?, ?)", []);
      for(let i = 0; i < 10; i+=1)
        yield stmt.run(uuid.v1(), `Product ${1}`)
      console.log('ok?')
      stmt.finalize();

      const rows = yield db.each("SELECT * FROM products")
      console.log(rows.length)
    } catch(err) {
      console.log(err)
      throw err
    } finally {
      db.close()
    }
  })
}

module.exports = runIt
