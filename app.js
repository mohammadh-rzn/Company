const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const companyRouter = require('./routers/companyRouter');
const employeeRouter = require('./routers/employeeRouter');
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect(
    'mongodb://localhost:27017/company'
, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine','ejs');
app.set('views','view');

app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json


app.use('/company', companyRouter);
app.use('/employee', employeeRouter);

app.get('/', function(req, res){
    res.redirect('http://localhost:3000/company/all')
})

app.use(express.static('public'));

app.listen(3000);