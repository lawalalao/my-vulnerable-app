const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { escape } = require('querystring');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

app.set('view engine', 'ejs');

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
    db.run("INSERT INTO users (username, password) VALUES ('admin', 'password')");
});

app.get('/', (req, res) => {
    res.render('index', { message: null });
});

// SQL Injection Vulnerability
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else if (row) {
            res.send('Login Successful');
        } else {
            res.render('index', { message: 'Invalid Credentials' });
        }
    });
});

// XSS Vulnerability
app.get('/xss', (req, res) => {
    const name = req.query.name;
    const encodedName = name.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    res.send(`<h1>Hello, ${encodedName}</h1>`);
});

// CSRF Vulnerability
app.get('/form', csrfProtection, (req, res) => {
    res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/submit', csrfProtection, (req, res) => {
    res.send('Form submitted');
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

