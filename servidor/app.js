const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');


const app = express();

//CONEXIÓN BD
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/primerBd';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(url, options).then(
    ()=>{console.log('Conectado a mongo')},
    err=>{err}
);

//MIDDLEWARE
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//RUTAS
app.get('/', function (req, res) {

    res.send('Hola mundo')
    
});

//MIDDLEWARE PARA vue.js
app.use('/api',require('./routes/primerBd'));
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);

app.listen (app.get('puerto'), function(){
    console.log('Escuchando puerto '+app.get('puerto')); 
});