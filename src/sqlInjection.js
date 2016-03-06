const async = require('async')

const sqlite3 = require('sqlite3').verbose();

const create = async(function*(db) {

})
function callbacksToResRej(resolve, reject) { return function callbacksToResRej(err) {
  if(err) return reject(err)
  resolve([...arguments].slice(1))
} }
function promisify(obj, methodName) {
    var args = [...arguments]
    return new Promise((resolve, reject) => {
      obj[methodName].apply(obj, args.concat([callbacksToResRej(resole, reject)]))
    })
  }
function promisifyObj (originalObject, methods) {
  return methods.reduce(Object.create(originalObject), (obj, method) =>
    Object.assign(obj, {[method]: promisify(obj, method)})
  )
}

module.exports = () =>  {

  const db = promisifyObj(new sqlite3.Database(':memory:'), ['get', 'run']);
  
  db.serialize(() => {
    db.get("SELECT name FROM sqlite_master WHERE type='table'", [], function(){
      console.log("here", arguments)
    })
    db.run("CREATE TABLE lorem (info TEXT)", [])
    db.get("SELECT 1 FROM sqlite_master WHERE type='table' AND name LIKE 'lorem' LIMIT 1", [], function(){
      console.log("here", arguments)
    })

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++)
        stmt.run("Ipsum " + i);

    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
  });
  db.close();

}
