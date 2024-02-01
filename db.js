const mongoose = require('mongoose');
require('dotenv').config();

let uri = process.env.DB;
const connect =mongoose.connect(uri);

connect.then(() => {
    console.log("DataBase connected successfully");
})
.catch((err)=> {
    console.log("Datebase cannot be connected ", err);
});
