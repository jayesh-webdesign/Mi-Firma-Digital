const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config');
const morgan = require('morgan');
const app = express();
const path = require('path')

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

app.use(express.static(path.join(__dirname, '../client/dist/mi-firma-digital')))



// Routes
app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../client/dist/mi-firma-digital/index.html'))
});

// For dev
app.use('/user', require('./app/routes/router'));
app.use('/file', require('./app/routes/file-upload'));

// For Prod
app.use('/api/user', require('./app/routes/router'));
app.use('/api/file', require('./app/routes/file-upload'));

// Start the Server
const PORT = process.env.PORT || 3000;//2087;
app.listen(PORT, console.log(`Server is running on port : ` + PORT));
