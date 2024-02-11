const express = require('express'); //creating a express server
const app = express(); //creating an instance of express app
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(routes);
const port = "4000"; //port on which app will handle all requests

const swaggerOptions = { 
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User Service API",
            version: "1.0.0",
            description: "User Service API"
        },
        servers: [
            {
                url: "http://localhost:4000"
            }
        ]
    },
    apis: ["routes/routes.js"]
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect('mongodb+srv://admin:aLDQhMWr2AQ3bsBe@cluster0.yz76vjj.mongodb.net/', { dbName: 'users', })
.then(() => {
    app.listen(port, () => {
        console.log(`App running on ${port}`);
    })
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log(error);
})