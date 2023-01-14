const express = require('express');
require('dotenv');

const port = process.env.PORT || 4400
const app = express();

app.get('/', (req, res)=> {
  res.send("Hello world!")
})

app.listen(port, ()=>{
  console.log("Server working on port: ", port)
})