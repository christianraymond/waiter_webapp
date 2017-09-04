const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/waiterApp';

mongoose.connect(mongoURL, {
  useMongoClient: true
},function(err){
  if(err){
    console.log(err);
  }else {
    console.log('Database ready to be used...!');
  }
});
const WaiterName = mongoose.model('WaiterName', {
  name : String
});

module.exports = WaiterName;
