const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

require('dotenv/config');
mongoose.set('bufferCommands', false);

//Middleware
app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');

//Middlewares
/*app.use('/posts', () => {
    console.log('This is a middleware running');
}); */
app.use('/posts', postsRoute);



//ROUTES
app.get('/', (req,res) =>{
    res.send('We are on home');
});


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () =>
console.log('connected to DB!')
);

//listen to server
app.listen(3000);
