const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const client = require('./configs/databasepg.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

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

const UserRoute = require('./routes/user.routes.js');
app.use("/user", UserRoute)

//Project route
const ProjectRoute = require('./routes/project.routes.js');
app.use("/project", ProjectRoute)


const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'My-Portfolio API Doc',
      version: '1.0.0',
      description: 'API Doc for My-Portfolio',
    },
    servers: [
      {
        url:'http://localhost:3000',
    },
  ],
  },
  // Paths to API docs and output format
  apis: ['routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.listen(port, () => {
  console.log(`Server is Running On Port ${port}`)
})

client.connect();