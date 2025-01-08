const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello from Node.js 1!');
});

app.listen(port, () => {
    console.log(`Node.js app is running at http://localhost:${port}`);
});