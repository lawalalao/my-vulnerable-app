const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const escapeHtml = require('escape-html'); 

const app = express();
const port = 3000;
const csrfProtect = csrf({ cookie: true })

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
    // const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.get(query, [username, password],(err, row) => {
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
    const encodedName = escapeHtml(name)
    res.send(`<h1>Hello, ${encodedName}</h1>`);
});


// CSRF Vulnerability
app.get('/form', csrfProtect, (req, res) => {
    res.render('csrfForm', { csrfToken: req.csrfToken() })
    // res.send(`
    //     <form action="/submit" method="POST">
    //         <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
    //         <input type="text" name="data" />
    //         <button type="submit">Submit</button>
    //     </form>
    // `);
});

app.post('/submit', csrfProtect, (req, res) => {
    res.send('Form submitted');
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

