const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from Kubernetes!',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});