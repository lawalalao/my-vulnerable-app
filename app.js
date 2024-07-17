const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const he = require('he');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
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
    const name = he.encode(req.query.name);
    res.send(`<h1>Hello, ${name}</h1>`);
});

// CSRF Vulnerability

const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });


app.get('/form', csrfProtection, (req, res) => {
    res.send(`
        <form action="/submit" method="POST">
            <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
            <input type="text" name="data" />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/submit', parseForm, csrfProtection, (req, res) => {
    res.send('Form submitted');
});


const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};


https.createServer(options, app).listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});
