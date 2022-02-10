const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.header('Origin'));
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', (req, res) => {
  res.send({ status: 'ok' });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
