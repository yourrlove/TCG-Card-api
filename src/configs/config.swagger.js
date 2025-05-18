const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'TCG API',
        description: "API endpoints for a TCG services documented on swagger",
        contact: {
            name: "yourrlove",
            email: "nanhvt2708@gmail.com",
            url: "https://github.com/yourrlove"
        },
        version: '1.0.0',
    },
    servers: [
        {
            url: "http://localhost:3000/",
            description: "Local server"
        },
        {
            url: "https://yourrlove.com/",
            description: "Production server"
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
