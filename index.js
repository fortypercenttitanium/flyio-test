require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Kitten = require('./kittySchema');
const app = express();

const DB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 8080;

try {
  mongoose.connect(DB_URL);
} catch (e) {
  console.error(e);
}

mongoose.connection.on('error', (err) => console.error(err));

const kitty = new Kitten({ name: 'Silence' });
Kitten.updateOne({ name: 'Silence' });

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/kitties', async (req, res) => {
  const kitties = await Kitten.find();

  res.json(kitties);
});
app.get('/kitty/:name', async (req, res) => {
  const kitty = await Kitten.find({ name: req.params.name });
  res.json(kitty);
});
app.post('/kitties', async (req, res) => {
  console.log(req.body);
  if (!req.body?.name) return res.status(400).send('Name required!');

  const kitty = new Kitten({ name: req.body.name });
  const result = await kitty.save();
  res.json(result);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
