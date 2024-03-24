var MongoClient = require('mongodb').MongoClient;
MongoClient(function(err, db) {
  if (err) throw err;
  var dbo = db.db("user");
  dbo.collection('detail').aggregate([
    { $lookup:
       {
         from: 'complain',
         localField: 'email',
         foreignField: 'email',
         as: 'alldetails'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});
console.log(MongoClient.EventEmitter)