const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/public'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage })


const app = express();

app.engine('.hbs', hbs.engine());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use('/user', (req, res) => {
  res.render('forbidden');
});

app.use(express.urlencoded({ extended: false }));

app.post('/contact/send-message', upload.single('projectFile'), (req, res) => {

  const { author, sender, title, message} = req.body;

  if(author && sender && title && message && req.file) {
    res.render('contact', { isSent: true, filePath: '/' + req.file.originalname});
  }
  else {
    res.render('contact', { isError: true });
  }

});

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

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.use((req, res) => {
  res.render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});