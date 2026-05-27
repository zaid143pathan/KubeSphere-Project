const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'mysql-service',
    user: 'root',
    password: 'root123'
});

db.connect((err) => {

    if (err) {
        console.log('Database connection failed:', err);
    } else {

        console.log('Connected to MySQL Database');

        db.query(`CREATE DATABASE IF NOT EXISTS kubesphere`, (err) => {

            if (err) {
                console.log(err);
            } else {

                db.query(`USE kubesphere`);

                db.query(`
                    CREATE TABLE IF NOT EXISTS users (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100)
                    )
                `);
            }
        });
    }
});

app.get('/', (req, res) => {
    res.send('Backend API Running with MySQL');
});

app.get('/api/users', (req, res) => {

    db.query('SELECT * FROM users', (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });

});

app.post('/api/users', (req, res) => {

    const name = req.body.name;

    db.query(
        'INSERT INTO users (name) VALUES (?)',
        [name],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'User Added Successfully'
            });
        }
    );
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
