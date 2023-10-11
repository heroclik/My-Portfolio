const bcrypt = require('bcrypt');
const client = require('../configs/databasepg.js');
const jwt =  require('jsonwebtoken');
const { jwtSecret } = require('../configs/jwt.js');

// Register a new user
async function register(req, res) {
    const user = req.body;

    // Hash the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        let insertQuery = `insert into users(username, email, password_hash) 
                            VALUES ($1, $2, $3)
                            RETURNING user_id`;
        const values = [user.username, user.email, hashedPassword];
    try {
        const result = await client.query(insertQuery, values);
        const userId = result.rows[0].user_id;
        res.status(201).json({ message: 'Insertion was successful', userId });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// login
async function login(req, res) {
    const { username, password } = req.body;

    // Check if the user with the provided username or email exists in the database
    const query = `
        SELECT user_id, username, password_hash
        FROM users
        WHERE username = $1`;

    try {
        const result = await client.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const user = result.rows[0];

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Generate and send a JSON Web Token (JWT) for authentication
        const token = jwt.sign({ user_id: user.user_id, username: user.username }, jwtSecret);
        res.status(200).json({ message: 'Authentication successful', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { register, login };
