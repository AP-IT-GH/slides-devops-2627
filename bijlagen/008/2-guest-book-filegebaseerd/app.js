import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

const guestsRaw = fs.readFileSync("guestbook.json");
const guests = JSON.parse(guestsRaw, dateReviver);

function dateReviver( key, value ) {
	if ( isSerializedDate( value ) ) {
		return( new Date( value ) );
	}
	return( value );
}

function isSerializedDate( value ) {
	const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
	return( isString( value ) && datePattern.test( value ) );
}

function isString( value ) {
	return( {}.toString.call( value ) === "[object String]" );
}

app.get('/', (_, res) => {
  res.render('index', { guestBookEntries: guests });
});

app.post('/sign-guestbook', (req, res) => {
  const { name } = req.body;
  const signingDate = new Date();
  const guest = { name, signingDate };
  guests.push(guest);
  const newContents = JSON.stringify(guests);
  fs.writeFileSync('guestbook.json', newContents);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Guest book app listening at http://localhost:${port}`);
});
