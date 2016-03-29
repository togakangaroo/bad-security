'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const notes = require('./noteStore')

app.use('/', express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/sticky-note', (req, resp) => {
	notes.add({name: req.body.name, message: req.body.message})
	resp.status(200).end()
})
app.get('/sticky-note', (req, resp) => notes.all().then(n => resp.json(n)) )

const server = app.listen(8373, () => {
  let host = server.address().address
  host == '::' && ( host = 'localhost' )
  const port = server.address().port

  const url = `http://${host}:${port}`

  console.log(`App listening at ${url}`)
})
