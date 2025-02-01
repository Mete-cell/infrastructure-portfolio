const express = require('express');
const promClient = require('prom-client');
const app = express();

// Prometheus Metriken Setup
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

// HTTP Request Counter
const httpRequestsCounter = new promClient.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'status_code']
});

app.get('/', (req, res) => {
    httpRequestsCounter.inc({ method: 'GET', status_code: 200 });
    res.json({
        message: 'Hello from Kubernetes - Updated Version!',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    httpRequestsCounter.inc({ method: 'GET', status_code: 200 });
    res.json({ status: 'healthy' });
});

// Metrics endpoint für Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.send(await promClient.register.metrics());
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});