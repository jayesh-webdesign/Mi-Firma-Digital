const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'))

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 204,
  methods: 'GET,PUT,POST,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, content-type, application/json, authorization'
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, content-type, application/json, authorization');
//     next();
//   });





// Routes
app.get('/', (req, res) => {
    res.send('Welcome')
});

app.use('/user', require('./app/routes/router'));
app.use('/file', require('./app/routes/file-upload'));

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on port : ` + PORT));
