require('dotenv/config');

const express = require('express');
const app = express();
const port = 3000;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/blog', async (req, res) => {

    const blogs = await prisma.blog.findMany();
    res.json(blogs);
})

// start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
