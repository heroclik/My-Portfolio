const client = require('../configs/databasepg.js');

// Get all users
async function getallproject(req, res) {
    try {
        const result = await client.query(`SELECT * FROM projects`);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get users by id
async function getprojectById(req, res) {
    try {
        const result = await client.query(`Select * from projects where project_id=${req.params.project_id}`);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// update users by id



module.exports = { getallproject, getprojectById};
