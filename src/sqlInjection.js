const co = require('co')
const sqlite3 = require('co-sqlite3');

const create = () => {
  // db.get("SELECT name FROM sqlite_master WHERE type='table'", []).then(res => {
  //   if
  // })
}
function callbacksToResRej(resolve, reject) { return function callbacksToResRej(err) {
  if(err) return reject(err)
  resolve([...arguments].slice(1))
} }
function promisify(obj, methodName) { return function() {
    var args = [...arguments]
    return new Promise((resolve, reject) => {
      obj[methodName].apply(obj, args.concat([callbacksToResRej(resolve, reject)]))
    })
}}



const runIt = (dbLocation) =>  {
  dbLocation || (dbLocation = `${__dirname}/../data/db.db`)

  return co(function*(){
    const db = yield sqlite3(dbLocation);
    try {
      const tableExists = yield db.get("SELECT 1 yes FROM sqlite_master WHERE type='table' AND name LIKE 'lorem' LIMIT 1", [])
      if(!tableExists || !tableExists[0] || !tableExists[0].yes)
          yield promisify(db, 'run')("CREATE TABLE lorem (info TEXT)", [])

      const res = yield promisify(db, 'get')("SELECT name FROM sqlite_master WHERE type='table'", [])
      console.log(res)
    } catch(err) {
      console.log(err)
      throw err
    } finally {
      db.close()
    }
  })
}

module.exports = runIt
    // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    // for (var i = 0; i < 10; i++)
    //     stmt.run("Ipsum " + i);
    //
    // stmt.finalize();
    //
    // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
    //     console.log(row.id + ": " + row.info);
    // });
  // db.close();
