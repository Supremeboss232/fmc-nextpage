const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const auth = require('./routes/auth');
const contact = require('./routes/contact');
const analytics = require('./routes/analytics');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', auth);
app.use('/api/contact', contact);
app.use('/api/analytics', analytics);

app.get('/', (req, res) => res.send('CapitalFlowX backend running'));

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then(()=> console.log('Mongo connected'))
    .catch(err=> console.error('Mongo connect error', err));
} else {
  console.warn('MONGO_URI not set — skipping MongoDB connection. Some routes may require a DB.');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server listening on', PORT));