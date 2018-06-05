const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const cors = require('cors')

app.use(cors());
app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes);

app.listen(app.get('port'));

module.exports = { app };
