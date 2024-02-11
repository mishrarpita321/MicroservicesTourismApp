const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 7000;

const routes = [
    {
        route: '/users',
        target: 'http://localhost:4000',
    },
    {
        route: '/countries',
        target: 'http://localhost:5000',
    },
    {
        route: '/places',
        target: 'http://localhost:9000',
    },
    {
        route: '/saveditems',
        target: 'http://localhost:8000',
    },
];

routes.forEach(({ route, target }) => {
    app.use(route, createProxyMiddleware({
        target,
        changeOrigin: true,
    }));
});

app.listen(port, () => {
    console.log(`API-Gateway listening at http://localhost:${port}`);
});