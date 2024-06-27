require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const TasksRouters = require('./routes/TasksRouters');
const loginRouter = require('./routes/api/login');
const registerRouter = require('./routes/api/register');




const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

mongoose.connect(process.env.MONGO_URI, {
  writeConcern: {
    w: 'majority',
  },
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
  process.exit(1);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});


app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/path/to', express.static(path.join(__dirname, 'path/to')))
app.use('/api/tasks', TasksRouters);
app.use('/api/users/login', loginRouter);
app.use('/api/users/register', registerRouter);


app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`\n  Rupayan Server  ready \n`)
  console.log(`Server is running on port ${PORT}`);
  console.log(`  ➜  Local:   http://localhost:${PORT}/`)
  console.log('  ➜  Network: use --host to expose')

});
