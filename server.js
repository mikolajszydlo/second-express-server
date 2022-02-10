const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs.engine());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use('/user', (req, res) => {
  res.render('forbidden');
})

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.use((req, res) => {
  res.render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});