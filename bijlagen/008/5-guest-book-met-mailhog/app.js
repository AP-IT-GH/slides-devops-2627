import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import { exit } from 'process';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;

const dbUser = process.env.DBUSER || (console.log("DBUSER ontbreekt") || exit(1));
const dbPassword = process.env.DBPASSWORD || (console.log("DBPASSWORD ontbreekt") || exit(1));

const connection = mysql.createConnection({
  host: "db",
  user: dbUser,
  password: dbPassword,
});
const transporter = nodemailer.createTransport({
  host: "mailhog",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database.');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const query = 'SELECT Name, SigningDate FROM Entries ORDER BY SigningDate DESC';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.render('index', { guestBookEntries: results });
  });
});

app.post('/sign-guestbook', (req, res) => {
  const { name } = req.body;
  const signingDate = new Date();
  const query = 'INSERT INTO Entries (Name, SigningDate) VALUES (?, ?)';
  transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  connection.query(query, [name, signingDate], (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(port, () => {
  const createDBQuery = 'CREATE DATABASE IF NOT EXISTS GuestBook;';
  const createTableQuery = 'CREATE TABLE IF NOT EXISTS Entries (Id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255) NOT NULL, SigningDate DATETIME NOT NULL)';
  connection.query(createDBQuery, (err) => { if (err) throw err; });
  connection.query('USE GuestBook', (err) => { if (err) throw err; });
  connection.query(createTableQuery, (err) => { if (err) throw err; });
  console.log(`Guest book app listening at http://localhost:${port}`);
});
