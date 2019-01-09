const createAzureFunctionHandler = require("azure-function-express").createAzureFunctionHandler;
const express = require("express");
const compression = require('compression');
const cors = require('cors');
const path = require('path');
// Router Imports
const apiRouter = require('./controllers/redisApiRoute');

// Create express app as usual
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Compress Routes
app.use(compression());

// Use Router
app.use('/', apiRouter);

app.listen(7071, () => console.log(`Listening on port 7071`));

// Binds the express app to an Azure Function handler
module.exports = createAzureFunctionHandler(app);