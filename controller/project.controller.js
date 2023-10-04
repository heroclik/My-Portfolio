const client = require('../configs/databasepg.js');

// get all project
async function getallproject(req, res) {
    try {
        const result = await client.query(`SELECT * FROM projects`);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// get project by id
async function getprojectById(req, res) {
    try {
        const result = await client.query(`Select projects.project_id, projects.project_name, projects.description, projects.created_at, users.username from projects left join users ON projects.owner_id = users.user_id where project_id=${req.params.project_id}`);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//create new project
async function newproject(req, res) {
    const project = req.body;

        let insertQuery = `insert into projects(project_name, description, owner_id) 
                            VALUES ($1, $2, $3)
                            RETURNING project_id`;
        const values = [project.project_name, project.description, project.owner_id];
    try {
        const result = await client.query(insertQuery, values);
        const projectId = result.rows[0].project_id;
        res.status(201).json({ message: 'Insertion was successful', projectId });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { getallproject, getprojectById, newproject};
