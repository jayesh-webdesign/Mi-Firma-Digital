const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use((req, res, next)=> {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Header', 'x-access-token');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

// Routes
app.get('/', (req, res) => {
    res.send('Welcome')
});

app.use('/user', require('./app/routes/router'));

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on port : ` + PORT));
