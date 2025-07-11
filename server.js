const express = require('express');
const app = express();
require('dotenv').config();

//const http = require('http');
const mongoose = require('mongoose');
const router = require('./router/routes');
//const setUpWebSocket = require('./webSocket');
//const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI
)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use("/api", router);

//setUpWebSocket(server);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(` Server running at http://${process.env.HOST || 'localhost'}:${PORT}`);
});
