const bcrypt = require('bcrypt');
const client = require('../configs/databasepg.js');

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

module.exports = { register };
