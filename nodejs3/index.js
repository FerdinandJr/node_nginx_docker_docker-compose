const express = require('express');
const app = express();
const port = 3003;

app.get('/', (req, res) => {
    res.send('Hello from Node.js 3!');
});

app.listen(port, () => {
    console.log(`Node.js app is running at http://localhost:${port}`);
});