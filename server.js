const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use('/api/v1', routes);

app.listen(app.get('port'));
