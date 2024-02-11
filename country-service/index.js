const express = require('express'); //creating a express server
const app = express(); //creating an instance of express app
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(routes);
const port = "5000"; //port on which app will handle all requests

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Country Service API",
            version: "1.0.0",
            description: "Country Service API"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["routes/routes.js"]
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect('mongodb+srv://admin:aLDQhMWr2AQ3bsBe@cluster0.yz76vjj.mongodb.net/', {dbName: 'countrydetails',}).
    then(() => {
        app.listen(port, () => {
            console.log(`Country App running on ${port}`);
        })
        console.log('Connected to MongoDB')
    }).catch((error) => {
        console.log(error);
    })