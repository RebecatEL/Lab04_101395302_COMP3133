const mongoose = require('mongoose');
const UserModel = require('./UserSchema');
const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rootadmin:N6Ejfd8aEbiryQjk@cluster0.etztr7w.mongodb.net/W2024_comp3133?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));



app.post('/users', (req, res) => {
    // Get the users data in array (JSON) from the request and create users in the database
    try{
        const users = req.body;
        UserModel.insertMany(users)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(400).json({ error: 'Bad Request' });
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });



