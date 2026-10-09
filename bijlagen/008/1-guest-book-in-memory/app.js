import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

const guests = [];

app.get('/', (req, res) => {
  res.render('index', { guestBookEntries: guests });
});

app.post('/sign-guestbook', (req, res) => {
  const { name } = req.body;
  const signingDate = new Date();
  guests.push({ name, signingDate });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Guest book app listening at http://localhost:${port}`);
});
