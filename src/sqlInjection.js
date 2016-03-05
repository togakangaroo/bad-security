const sqlite3 = require('sqlite3').verbose();

module.exports = () =>  {

  const db = new sqlite3.Database(':memory:');
  db.serialize(() => {
    db.run("SELECT name FROM sqlite_master WHERE type='table'", [], function(){
      console.log("here", arguments)
    })
    // db.run("CREATE TABLE lorem (info TEXT)");
    //
    // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    // for (var i = 0; i < 10; i++) {
    //     stmt.run("Ipsum " + i);
    // }
    // stmt.finalize();
    //
    // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
    //     console.log(row.id + ": " + row.info);
    // });
  });

  db.close();
}
