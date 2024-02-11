const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

app.use(cors(
    {
        origin: '*'
    }
));

app.use(routes);
const port = 9000;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Place Service API",
            version: "1.0.0",
            description: "Place Service API"
        },
        servers: [
            {
                url: "http://localhost:9000"
            }
        ]
    },
    apis: ["routes/routes.js"]
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect('mongodb+srv://admin:aLDQhMWr2AQ3bsBe@cluster0.yz76vjj.mongodb.net/', { dbName: 'places', })
.then(() => {
    app.listen(port, () => {
        console.log(`App running on ${port}`);
    })
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log(error);
})