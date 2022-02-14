const express = require('express');
const bodyparser = require('body-parser');
const { sequelize } = require('./models');

// const main = async () => {
//   await sequelize.sync();
// };

// main();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const app = express();
const PORT = 4000;

app.disable('etag');

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api/users', require('./routes/user'));

app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
