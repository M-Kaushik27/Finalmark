const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'signup'
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", (req, res) => {
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    const query = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";

    db.query(query, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/login", (req, res) => {
    const query = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";

    db.query(query, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
