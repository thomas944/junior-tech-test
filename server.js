const express = require('express')
const app = express()
const mars = require('./mars')

app.get('/', (req, res) => {
  res.send("HELLO")
})

app.set('view engine', 'ejs')

app.use('/mars-rover/images', mars)



app.listen(3000)

