const express = require('express');
const cors = require('cors');
require('dotenv').config();
const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

// const hereIsTheUpsideDown = true;
// const { UPSIDEDOWN_MODE } = process.env;
const upsidedown = JSON.parse(process.env.UPSIDEDOWN_MODE);

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    upsidedown,
  );

  res.status(200).json(characters);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Escutando na porta 3000');
});