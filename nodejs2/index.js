const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
    res.send('Hello from Node.js 2!');
});

app.listen(port, () => {
    console.log(`Node.js app is running at http://localhost:${port}`);
});