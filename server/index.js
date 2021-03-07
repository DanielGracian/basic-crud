require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const { mongoose } = require('./config/database');
const cors = require('cors');  
const Db = require('./config/database');
const properties = require('./config/properties');
const is_auth = require('./middleware/is_authorized');

// Settings
app.set('port', properties.PORT);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api', require('./routes/userRoutes'));
app.use((req, res, next) => {
    is_auth.preAuth(req, res, next)
});

app.use('/api', require('./routes/employeeRoutes'));

//default err
app.use((error, req, res, next) => {
    const status = error.http_code || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// Start server
app.listen(app.get('port'), ()=>{
    console.log('Server on port: ' + app.get('port'));
});


