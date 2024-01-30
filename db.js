const mongoose = require('mongoose');
//const connect =mongoose.connect('mongodb://localhost:27017/userdata');
let uri = "mongodb+srv://suwaliarora:qB1BLarzefGnRjN2@cluster0.db9s47o.mongodb.net/userdata?retryWrites=true&w=majority";
const connect =mongoose.connect(uri);

connect.then(() => {
    console.log("DataBase connected successfully");
})
.catch((err)=> {
    console.log("Datebase cannot be connected ", err);
});
