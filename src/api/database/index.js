'use strict';

const mongoose = require('mongoose');

const config = require('../config');
const isEnvironment = require('../utils/isEnvironment');

const database = {
  drop() {
    return new Promise((resolve, reject) => {
      if (isEnvironment(['production', 'preproduction'])) {
        reject(console.error('Error:', 'production and preproduction databases cannot be dropped'));
      }

      mongoose.connection.dropDatabase(() => {
        resolve(console.log('Database:', 'Cleaned'));
      });
    });
  },

  runSingleAction(action) {
    return database.connect()
      .then(() => {
        console.log('Database:', 'Connection opened');
        return action();
      })
      .then(() => {
        return database.closeConnection();
      })
      .catch((err) => {
        console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message); // eslint-disable-line
        return database.closeConnection();
      });
  },

  connect() {
    return new Promise((resolve, reject) => {
      // NOTE. Specifically specifying the port right now due to a current issue with Mongoose:
      // https://stackoverflow.com/questions/51156334/unhandled-rejection-mongoerror-port-must-be-specified
      const databaseName = `mongodb://${config.database.host}:27017/${config.database.name}`;

      mongoose.connect(databaseName, {
        useNewUrlParser: true
      });
      mongoose.connection
        .on('open', () => resolve())
        .on('error', (err) => reject(err.message));
    });
  },

  closeConnection() {
    mongoose.connection.close();
    console.log('Database:', 'Connection closed');
  }
};

module.exports = database;
