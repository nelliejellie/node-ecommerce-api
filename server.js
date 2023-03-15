const http = require('http');
const mongoose = require('mongoose')
const port = process.env.PORT || 3000;
const app = require('./app')

const server = http.createServer(app);

mongoose.connection.once('open',()=>{
 console.log("connected to mongodb")
 server.listen(port, ()=>{
    console.log(`server is running ${port}`)
 });
})


