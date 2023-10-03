const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const client = require('./configs/databasepg.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// test route
app.get("/", (req, res) => {
    res.json({ message: "API WORK." });
  });
  
//Auth  route
const AuthRoute = require('./routes/auth.routes.js');
app.use("/auth", AuthRoute)

//User route
const UserRoute = require('./routes/user.routes.js');
app.use("/user", UserRoute)

//Project route
const ProjectRoute = require('./routes/project.routes.js');
app.use("/project", ProjectRoute)


app.listen(port, () => {
  console.log(`Server is Running On Port ${port}`)
})

client.connect();