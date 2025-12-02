const express = require('express');
const app = express();
const port = 8887;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// ---- MongoDB + Mongoose Setup ----
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const dbName = 'restaurantDB';
const url = `mongodb://127.0.0.1:27017/${dbName}`;
mongoose.connect(url);

const db = mongoose.connection;
db.on('error', (err) => console.log('DB error:', err));

// ---- User Schema ----
const userSchema = new mongoose.Schema({
  uname: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('users', userSchema);

// ---- CONNECT + Start Server ----
db.once('open', () => {
  console.log('MongoDB connected');

  // TEMP
  app.get('/', (req, res) => {
    res.send('Backend is running with DB');
  });

  // CREATE
  app.post('/insertUser', (req, res) => {
    const input = req.body.params;
    User.create(input)
      .then(
        (result) => res.send({ message: 'User added', user: result }),
        (err)    => res.send({ message: err.message })
      );
  });

  // READ
  app.get('/retrieveUsers', (req, res) => {
    User.find(req.query)
      .then(
        (result) => res.send(result),
        (err)    => res.send({ message: err.message })
      );
  });

  // UPDATE
  app.put('/updateUser', (req, res) => {
    const input = req.body.params;
    User.updateOne({ _id: input._id }, { $set: input })
      .then(
        (result) => res.send({ message: 'User updated', result }),
        (err)    => res.send({ message: err.message })
      );
  });

  // DELETE
  app.delete('/deleteUser', (req, res) => {
    User.deleteOne(req.query)
      .then(
        (result) => res.send({ message: 'User deleted', result }),
        (err)    => res.send({ message: err.message })
      );
  });

  app.listen(port, () =>
    console.log(`Server running at http://127.0.0.1:${port}`)
  );
});
