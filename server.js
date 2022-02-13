//importing the necessary tools for fetching data from API and creating the endpoints
const fetch = require('node-fetch');
const express = require('express');

//creating an app variable that will use the express, setting up the server
const app = express();
const cors = require('cors');
app.use(cors());

const url = 'https://jsonplaceholder.typicode.com/users';

//GET method to retrieve a list of users;

app.get('/users', (req, res) => {
  fetch(url)
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        filterObject(user);
      });
      res.send(users);
    })
    .catch((error) => {
      res.send(error);
    });
});

//GET method to retrieve a user with a specific id
app.get('/users/:id', (req, res) => {
  fetch(`${url}/${req.params.id}`)
    .then((response) => response.json())
    .then((user) => {
      filterObject(user);
      console.log(user);
      res.json(user);
    })
    .catch((error) => {
      res.send(error);
    });
});

//method that filters and removes unnecessary values from the object created from the fetched json
const filterObject = (object) => {
  delete object.address.suite;
  delete object.address.geo;
  delete object.company.catchPhrase;
  delete object.company.bs;
};

app.listen(3000, () => {
  console.log('the app is running');
});
